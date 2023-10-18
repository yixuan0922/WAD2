import { createStore } from "vuex";
import { db, auth } from "../firebase/firebaseInit";
import {collection, doc, getDoc} from 'firebase/firestore';

export default createStore({
  state: {
    user: null,
    // profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {},
  mutations: {
    updateUser(state, payload) {
      state.user = payload; 
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    }, 
    setProfileInitials(state){
      state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
    }
  },
  actions: {
    async getCurrentUser({commit}) {
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid)
      const dbResults = await getDoc(userDoc);
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
      console.log('dbResults', dbResults);
    },

    // async getCalEvent(){
    //   const currentUser = auth.currentUser;
    //   const database = collection(db, "users");
    //   const userDoc = doc(database, currentUser.uid)
    //   const calEventCollection = collection(userDoc, "calEvent");
    //   let snapshot = await getDocs(calEventCollection);
    //   snapshot.forEach(doc => {
    //     console.log('doc', doc.data());
    //   })
    // }

  },
  modules: {},
});
