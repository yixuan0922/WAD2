import { createStore} from "vuex";
import { db, auth } from "../firebase/firebaseInit";
import {collection, doc, getDoc, getDocs, setDoc, deleteDoc} from 'firebase/firestore';

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
      console.log('SetEvents',state.events);
    },
    ADD_EVENT: (state, event) => {
      state.events.push(event)
    },
    UPDATE_EVENT: (state, {id, title, start, end, allDay}) => {
        let index = state.events.findIndex(_event => _event.id == id)
        
        state.events[index].title = title;
        state.events[index].start = start;
        state.events[index].end = end;
        state.events[index].allDay = allDay; 

        console.log('updateEvents',state.events);
    },
    DELETE_EVENT: (state, id) => {
        let index = state.events.findIndex(_event => _event.id == id)
        state.events.splice(index, 1)
        console.log('DeleteEvents',state.events);
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
          // console.log('appData Before', typeof(appData.start));

          appData.start = new Date(appData.start);
          console.log('appData.start', appData.start);
          appData.end = new Date(appData.end);

          // console.log('appDate after', typeof(appData.start));
          events.push(appData);
          // console.log('FetchEvents', events);
      });
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
    async addEvent({commit}, event){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calEvent");
      const eventDoc = doc(calEventCollection, String(event.id));

      await setDoc(eventDoc, {
        title: event.title, 
        start: String(event.start), 
        end: String(event.end),  
        allDay: Boolean(event.allDay),
      })

      commit("ADD_EVENT", event);
    },

    async updateEvent({commit}, event){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calEvent");
      const eventDoc = doc(calEventCollection, String(event.id));
      console.log(event.allDay);

      await setDoc(eventDoc, {
        title: event.title, 
        start: String(event.start), 
        end: String(event.end),  
        allDay: Boolean(event.allDay),
      }, {merge: true});

      commit("UPDATE_EVENT", event);
    },

    async deleteEvent({commit}, id){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calEvent");
      const eventDoc = doc(calEventCollection, id);

      await deleteDoc(eventDoc);

      commit("DELETE_EVENT", id);
    }
  },
  modules: {},
});
