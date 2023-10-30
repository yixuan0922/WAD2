import { createStore} from "vuex";
import { db, auth } from "../firebase/firebaseInit";
import {collection, doc, getDoc, getDocs, setDoc, deleteDoc, writeBatch, query, where,} from 'firebase/firestore';

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
    invitees: [],
    invitee_exist: true,
    pendingEvents: [], 
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
    UPDATE_EVENT: (state, {id, title, start, end, allDay, invitees}) => {
        let index = state.events.findIndex(_event => _event.id == id)
        
        state.events[index].title = title;
        state.events[index].start = start;
        state.events[index].end = end;
        state.events[index].allDay = allDay;
        state.events[index].invitees = invitees;

        console.log('updateEvents',state.events);
    },
    DELETE_EVENT: (state, id) => {
        let index = state.events.findIndex(_event => _event.id == id)
        state.events.splice(index, 1)
        console.log('DeleteEvents',state.events);
    },
    DELETE_COLLECTION: (state) => {
      state.events = [];
    },
    // Invitees
    SET_INVITEES(state, inviteeObj) {
      state.invitees.push(inviteeObj);
      console.log('SetInvitees',state.invitees);
    },
    INVITEE_EXIST(state, bool) {
      state.invitee_exist = bool;
      console.log('InviteeExist',state.invitee_exist);
    },
    SET_PENDING_INVITES(state, pendingEvents){
      state.pendingEvents = pendingEvents;
    },

    UPDATE_PENDING_EVENTS(state,invite) {
      console.log(invite.id)
      let index = state.pendingEvents.findIndex(_event => _event.id == invite.id)
      state.pendingEvents.splice(index, 1);
      console.log('updatePendingEvents',state.pendingEvents);
    },

    ADD_INVITE_EVENTS_TO_CALENDAR(state, invite){
      state.events.push(invite);
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
    }, 

  },
  actions: {
    async fetchEvents({commit}, checkedCategories) {
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      
      let events = [];
      
      if (checkedCategories.includes('Event')) {
        const calEventCollection = collection(userDoc, "calEvent");
        let snapshot = await getDocs(calEventCollection);
        snapshot.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });
      }
    
      if (checkedCategories.includes('Exam')) {
        const calExamCollection = collection(userDoc, "calExam");
        let snapshotExams = await getDocs(calExamCollection);
        snapshotExams.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });
      }
    
      if (checkedCategories.includes('Class')) {
        const calClassCollection = collection(userDoc, "calClass");
        let snapshotClass = await getDocs(calClassCollection);
        snapshotClass.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });
      }

      // if (checkedCategories.includes('Invites')) {
      //   const calInviteCollection = collection(userDoc, "calInvite");
      //   let snapshotInvite = await getDocs(calInviteCollection);
      //   snapshotInvite.forEach(inviteDoc => {
      //     const invitorId = inviteDoc.data().invitorId;
      //     const inviteEventId = inviteDoc.data().id;

      //     const invitorDoc = doc(database, invitorId);
      //     const calEventCollection = collection(invitorDoc, "calEvent");
      //     const eventDoc = doc(calEventCollection, inviteEventId);

      //     getDoc(eventDoc).then((doc) => {
      //       console.log(doc.id);
      //       console.log(doc.data());

      //       let appData = doc.data();
      //       appData.id = doc.id;
      //       appData.start = new Date(appData.start);
      //       appData.end = new Date(appData.end);
      //       events.push(appData);

      //     });
      //     console.log(inviteEventId);
      //     console.log(invitorId);
      //   });
      // }

      if (checkedCategories.includes('Invites')) {
        const calInviteCollection = collection(userDoc, "calInvite");
        let snapshotInvite = await getDocs(calInviteCollection);
        for (let inviteDoc of snapshotInvite.docs) {
          const invitorId = inviteDoc.data().invitorId;
          const inviteEventId = inviteDoc.data().id;
      
          const invitorDoc = doc(database, invitorId);
          const calEventCollection = collection(invitorDoc, "calEvent");
          const eventDoc = doc(calEventCollection, inviteEventId);
      
          let document = await getDoc(eventDoc);
          console.log(document.id);
          console.log(document.data());
          
          const appData = document.data() || {};
          appData.id = document.id;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
      
          console.log(inviteEventId);
          console.log(invitorId);
        }
      }
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
        invitees: event.invitees,
      })

      commit("ADD_EVENT", event);
    },

    async addExam({commit}, event){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calExam");
      const eventDoc = doc(calEventCollection, String(event.id));

      await setDoc(eventDoc, {
        title: event.title, 
        start: String(event.start), 
        end: String(event.end),  
        allDay: Boolean(event.allDay),
      })

      commit("ADD_EVENT", event);
    },

    async addClass({commit}, event){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calClass");
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

    async deleteEvent({commit}, event){
      let eventId = event.id;
      let invitees = event.invitees;
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calEvent");
      const eventDoc = doc(calEventCollection, eventId);
      console.log('iseventdoc there',eventDoc);

      console.log(invitees);


      invitees.forEach( async(invitee)=> {
        const inviteeDoc = doc(database, invitee.id);
        const calInviteCollection = collection(inviteeDoc, "calInvite");
        const inviteDoc = doc(calInviteCollection, eventId);
        await deleteDoc(inviteDoc);
      });
    
      await deleteDoc(eventDoc);

      commit("DELETE_EVENT", eventId);
    },

    async deleteCol({commit}){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      const calEventCollection = collection(userDoc, "calEvent");
      const calClassCollection = collection(userDoc, "calClass");
      const calExamCollection = collection(userDoc, "calExam");
    
      // Get a new write batch
      let batch = writeBatch(db);
    
      // Delete documents in a batch
      const qEvent = query(calEventCollection);
      const querySnapshotEvent = await getDocs(qEvent);
      querySnapshotEvent.forEach((doc) => {
        batch.delete(doc.ref);
      });
      // Commit the batch
      // await batch.commit();

      const qClass = query(calClassCollection);
      const querySnapshotClass = await getDocs(qClass);
      querySnapshotClass.forEach((doc) => {
        batch.delete(doc.ref);
      });
      // Commit the batch
      // await batch.commit();

      const qExam = query(calExamCollection);
      const querySnapshotExam = await getDocs(qExam);
      querySnapshotExam.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Commit the batch
      await batch.commit();
    
      commit("DELETE_COLLECTION");
    }, 

    // check invitee
    async checkInvitee({commit},invitee) {
      invitee = invitee.toLowerCase();
      const database = collection(db, "users");
      // check for user with invitee email and check if exists
      const qInvitee = query(database, where("email", "==", invitee));
      const inviteeDocs = await getDocs(qInvitee);
      
      if (inviteeDocs.empty) {
        // this.state.invitee_exist = false;
        // console.log(this.state.invitee_exist);
        commit('INVITEE_EXIST', false);
      } else {
        const userId = inviteeDocs.docs[0].id;
        console.log(userId);
        
        let inviteeObj = {};
        inviteeDocs.forEach((inviteeDoc) => {
          inviteeObj['id'] = inviteeDoc.id;
          inviteeObj['email'] = inviteeDoc.data().email;
        });


        // const userDoc = doc(database, userId);
        // const calEventCollection = collection(userDoc, "calEvent");
        // const calClassCollection = collection(userDoc, "calClass");
        // const calExamCollection = collection(userDoc, "calExam");

        // let events = [];

        // const qEvent = query(calEventCollection);
        // const querySnapshotEvent = await getDocs(qEvent);
        // querySnapshotEvent.forEach((doc) => {
        //   let appData = doc.data();
        //   appData.id = doc.id;
        //   appData.start = new Date(appData.start);
        //   appData.end = new Date(appData.end);
        //   events.push(appData);

        // });
        // const qClass = query(calClassCollection);
        // const querySnapshotClass = await getDocs(qClass);
        // querySnapshotClass.forEach((doc) => {
        //   let appData = doc.data();
        //   appData.id = doc.id;
        //   appData.start = new Date(appData.start);
        //   appData.end = new Date(appData.end);
        //   events.push(appData);
        // });


        // const qExam = query(calExamCollection);
        // const querySnapshotExam = await getDocs(qExam);
        // querySnapshotExam.forEach((doc) => {
        //   let appData = doc.data();
        //   appData.id = doc.id;
        //   appData.start = new Date(appData.start);
        //   appData.end = new Date(appData.end);
        //   events.push(appData);
        // });

        // console.log(events);
        // inviteeObj['events'] = events;
        // console.log('InvteeObject', inviteeObj);
        commit('SET_INVITEES', inviteeObj);
      } 
    }, 
    async getPendingEvents({commit}) {
      const currentUserId = auth.currentUser.uid;
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      let pendingEvents = [];
      for (const userDoc of usersSnapshot.docs) {
        const eventsRef = collection(userDoc.ref, 'calEvent');
        const InvitorId = userDoc.id;
        const eventsSnapshot = await getDocs(eventsRef);
    
        for (const eventDoc of eventsSnapshot.docs) {
          const event = eventDoc.data();
          event.id = eventDoc.id;
          const invitees = event.invitees || [];
          for (const invitee of invitees) {
            if (invitee.id == currentUserId && invitee.status == 'pending') {
              event.invitorId = InvitorId;
              event.invitorEmail = userDoc.data().email;
              pendingEvents.push(event);
              break;
            }
          }
        }
      }
      console.log(pendingEvents);
      commit('SET_PENDING_INVITES', pendingEvents);
    }, 

    async acceptInvite({commit},event) {
      console.log(event);
      console.log(event.id, event.title, event.start, event.end, event.invitees, event.invitorEmail, event.invitorId)
      const currentUserId = auth.currentUser.uid;
      
      const database = collection(db, "users");
      const invitorDoc = doc(database, event.invitorId);
      const calEventCollection = collection(invitorDoc, "calEvent");
      const eventDoc = doc(calEventCollection, String(event.id));
      
      await setDoc(eventDoc, {
        title: event.title, 
        start: String(event.start), 
        end: String(event.end),  
        allDay: Boolean(event.allDay),
        invitees: event.invitees.map(invitee => {
          if (invitee.id == currentUserId) {
            console.log(invitee.id, currentUserId);
            invitee.status = 'accepted';
          }
          return invitee;
        })
      }, {merge: true});

      const inviteeDoc = doc(database, currentUserId);
      const calInviteCollection = collection(inviteeDoc, "calInvite");
      const inviteDoc = doc(calInviteCollection, String(event.id));

      console.log(event);
      console.log('inviteDoc', inviteDoc);

      // const calEventCollection = collection(userDoc, "calClass");
      // const eventDoc = doc(calEventCollection, String(event.id));

      // await setDoc(eventDoc, {
      //   title: event.title, 
      //   start: String(event.start), 
      //   end: String(event.end),  
      //   allDay: Boolean(event.allDay),
      // })

      await setDoc(inviteDoc, {
        id: event.id, 
        invitorId: event.invitorId,
        // location: event.location,
      });

      commit('ADD_INVITE_EVENTS_TO_CALENDAR', event);
      commit('UPDATE_PENDING_EVENTS', event);
      
    },

    async declineInvite({commit},event) {
      console.log(event);
      console.log(event.id, event.title, event.start, event.end, event.invitees, event.invitorEmail, event.invitorId)
      const currentUserId = auth.currentUser.uid;
      
      const database = collection(db, "users");
      const invitorDoc = doc(database, event.invitorId);
      const calEventCollection = collection(invitorDoc, "calEvent");
      const eventDoc = doc(calEventCollection, String(event.id));
    
      await setDoc(eventDoc, {
        title: event.title, 
        start: String(event.start), 
        end: String(event.end),  
        allDay: Boolean(event.allDay),
        invitees: event.invitees.map(invitee => {
          if (invitee.id == currentUserId) {
            console.log(invitee.id, currentUserId);
            invitee.status = 'declined';
          }
          return invitee;
        })
      }, {merge: true});
     
      const docAfterSet = await getDoc(eventDoc);
      console.log(docAfterSet.data());
      console.log(event);
      commit('UPDATE_PENDING_EVENTS', event);

    },

    
    
      
    
  },
  modules: {},
});
