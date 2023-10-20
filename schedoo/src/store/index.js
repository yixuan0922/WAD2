import { createStore} from "vuex";
import { db, auth } from "../firebase/firebaseInit";
import {collection, doc, getDoc, getDocs} from 'firebase/firestore';

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
    events: [],
  },
  getters: {
    EVENTS: state => state.events, 
  },
  mutations: {
    // Events
    SET_EVENTS(state, events) {
      state.events = events;
      // console.log(events);

    },
    ADD_EVENT: (state, event) => {
      state.events.push(event)
      console.log(state.events);
    },
    UPDATE_EVENT: (state, {id, title, start, end}) => {
        let index = state.events.findIndex(_event => _event.id == id)
        
        state.events[index].title = title;
        state.events[index].start = start;
        state.events[index].end = end;
    },
    DELETE_EVENT: (state, id) => {
        let index = state.events.findIndex(_event => _event.id == id)
        state.events.splice(index, 1)
        console.log(state.events);
    },
    // User
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
    async fetchEvents({commit}) {
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calEvent");
      let snapshot = await getDocs(calEventCollection);
      let events = [];
      snapshot.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
      });
      console.log('events', events);
      commit('SET_EVENTS', events);
      
    }, 
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
