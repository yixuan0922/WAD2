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
    allEvents: [],
    eventsComLoc: [],
  },
  getters: {
    EVENTS: state => state.events, 
    userGoals: (state) => state.userGoals,
    ALLEVENTS: state => state.allEvents,
    EVENTS_COM_LOC: state => state.eventsComLoc,
  },
  mutations: {
    // Events
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_ALL_EVENTS(state, events) {
      state.allEvents = events;
    },
    SET_EVENTS_FOR_COM_LOC(state, events) {
      console.log('events',events);
      state.eventsComLoc = events;
      console.log('state', state.eventsComLoc);
    },

    ADD_EVENT: (state, {event, color}) => {
      console.log('add_event', event.category);
      event.color = color;
      state.events.push(event)
    },
    UPDATE_EVENT: (state, {id, title, start, end, allDay, invitees}) => {
        let index = state.events.findIndex(_event => _event.id == id)
        
        state.events[index].title = title;
        state.events[index].start = start;
        state.events[index].end = end;
        state.events[index].allDay = allDay;
        state.events[index].invitees = invitees;

    },
    DELETE_EVENT: (state, id) => {
        let index = state.events.findIndex(_event => _event.id == id)
        state.events.splice(index, 1)
    },
    DELETE_COLLECTION: (state) => {
      for (let i = state.events.length - 1; i >= 0; i--) {
          let event = state.events[i];
          console.log(event.title, event.category);
          if (event.category == 'exam' || event.category == 'class') {
              console.log('delete', event.title, event.category);
              state.events.splice(i, 1);
          }
        }
      },
    // Invitees
    SET_INVITEES(state, inviteeObj) {
      state.invitees.push(inviteeObj);
    },
    INVITEE_EXIST(state, bool) {
      state.invitee_exist = bool;
    },
    SET_PENDING_INVITES(state, pendingEvents){
      state.pendingEvents = pendingEvents;
    },

    UPDATE_PENDING_EVENTS(state,invite) {
      let index = state.pendingEvents.findIndex(_event => _event.id == invite.id)
      state.pendingEvents.splice(index, 1);
    },

    ADD_INVITE_EVENTS_TO_CALENDAR(state, event){
      // invite.color = color;
      state.events.push(event);
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
    async fetchAllEvents({commit}) {
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      
      let events = [];
      
      const calEventCollection = collection(userDoc, "calEvent");
      let snapshot = await getDocs(calEventCollection);
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;

        let color = '#87bba2' // light green ;

        // // 1st set of colors
        // switch (appData.category) {
        //   case 'event':
        //     color = '#ffcbcb'; //pink
        //     break;
        //   case 'exam':
        //     color = '#ffdfba'; // orange
        //     break;
        //   case 'class':
        //     color = '#bae1ff'; // blue
        //     break;
        //   case 'invite':
        //     color = '#baffc9'; // green
        //     break;
  
        //   default:
        //     color = '#ffcbcb'; 
        // }

        // 2nd set of colors
        // switch (appData.category) {
        //   case 'event':
        //     color = '#87bba2'; //light green
        //     break;
        //   case 'study':
        //     color = '#009688'; // dark green
        //     break;
        //   case 'cca':
        //     color = '#70c1b3'; // cyan
        //     break;
        //   case 'personal':
        //     color = '#8D6298'; // purple
        //     break;
        //   case 'class':
        //     color = '#a6a2a2'; // brown grey lolipop
        //     break;
        //   case 'exam':
        //     color = '#dec3c3'; // pink
        //     break;
        //   case 'invite':
        //     color = '#4d648d'; // blueberry blue
        //     break;
  
        //   default:
        //     color = '#87bba2'; 
        // }
        
        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        
        events.push(appData);
      });
    
      const calExamCollection = collection(userDoc, "calExam");
      let snapshotExams = await getDocs(calExamCollection);
      snapshotExams.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;

        let color =  '#dec3c3'; // pink
        
        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        events.push(appData);
      });
    
      const calClassCollection = collection(userDoc, "calClass");
      let snapshotClass = await getDocs(calClassCollection);
      snapshotClass.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;

        let color = '#a6a2a2'; // brown grey lolipop

        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        events.push(appData);
      });
      

      
      const calStudyCollection = collection(userDoc, "calStudy");
      let snapshotStudy = await getDocs(calStudyCollection);
      snapshotStudy.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;

        let color = '#009688'; // dark green

        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        events.push(appData);
      });
      

      
      const calCCACollection = collection(userDoc, "calCCA");
      let snapshotCCA = await getDocs(calCCACollection);
      snapshotCCA.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;

        let color = '#70c1b3'; // cyan

        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        events.push(appData);
      });
      

      
      const calPersonalCollection = collection(userDoc, "calPersonal");
      let snapshotPersonal = await getDocs(calPersonalCollection);
      snapshotPersonal.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;

        let color = '#8D6298'; // purple

        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        events.push(appData);
      });
    
      const calInviteCollection = collection(userDoc, "calInvite");
      let snapshotInvite = await getDocs(calInviteCollection);
      for (let inviteDoc of snapshotInvite.docs) {
        const invitorId = inviteDoc.data().invitorId;
        const inviteEventId = inviteDoc.data().id;
    
        const invitorDoc = doc(database, invitorId);
        const calEventCollection = collection(invitorDoc, "calEvent");
        const eventDoc = doc(calEventCollection, inviteEventId);
    
        let document = await getDoc(eventDoc);
        
        const appData = document.data() || {};
        appData.id = document.id;

        let color = '#4d648d'; // blueberry blue
        
        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        events.push(appData);
      }
      
      commit('SET_ALL_EVENTS', events);
    },
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

          let color = '#87bba2' // light green ;

          // // 1st set of colors
          // switch (appData.category) {
          //   case 'event':
          //     color = '#ffcbcb'; //pink
          //     break;
          //   case 'exam':
          //     color = '#ffdfba'; // orange
          //     break;
          //   case 'class':
          //     color = '#bae1ff'; // blue
          //     break;
          //   case 'invite':
          //     color = '#baffc9'; // green
          //     break;
    
          //   default:
          //     color = '#ffcbcb'; 
          // }

          // 2nd set of colors
          // switch (appData.category) {
          //   case 'event':
          //     color = '#87bba2'; //light green
          //     break;
          //   case 'study':
          //     color = '#009688'; // dark green
          //     break;
          //   case 'cca':
          //     color = '#70c1b3'; // cyan
          //     break;
          //   case 'personal':
          //     color = '#8D6298'; // purple
          //     break;
          //   case 'class':
          //     color = '#a6a2a2'; // brown grey lolipop
          //     break;
          //   case 'exam':
          //     color = '#dec3c3'; // pink
          //     break;
          //   case 'invite':
          //     color = '#4d648d'; // blueberry blue
          //     break;
    
          //   default:
          //     color = '#87bba2'; 
          // }
          
          appData.color = color;
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

          let color =  '#dec3c3'; // pink
          
          appData.color = color;
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

          let color = '#a6a2a2'; // brown grey lolipop

          appData.color = color;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });
      }

      if (checkedCategories.includes('Study')) {
        const calStudyCollection = collection(userDoc, "calStudy");
        let snapshotStudy = await getDocs(calStudyCollection);
        snapshotStudy.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;

          let color = '#009688'; // dark green

          appData.color = color;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });
      }

      if (checkedCategories.includes('CCA')) {
        const calCCACollection = collection(userDoc, "calCCA");
        let snapshotCCA = await getDocs(calCCACollection);
        snapshotCCA.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;

          let color = '#70c1b3'; // cyan

          appData.color = color;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });
      }

      if (checkedCategories.includes('Personal')) {
        const calPersonalCollection = collection(userDoc, "calPersonal");
        let snapshotPersonal = await getDocs(calPersonalCollection);
        snapshotPersonal.forEach(doc => {
          let appData = doc.data();
          appData.id = doc.id;

          let color = '#8D6298'; // purple

          appData.color = color;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });
      }

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
          
          const appData = document.data() || {};
          appData.id = document.id;

          let color = '#4d648d'; // blueberry blue
          
          appData.color = color;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        }
      }

      commit('SET_EVENTS', events);
    },
    async fetchEventsForComLoc({commit}) {
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      
      let events = [];
      const calEventCollection = collection(userDoc, "calEvent");
      let snapshot = await getDocs(calEventCollection);
      snapshot.forEach(doc => {
        let appData = doc.data();
        appData.id = doc.id;

        let color = '#87bba2' // light green ;
        
        appData.color = color;
        appData.start = new Date(appData.start);
        appData.end = new Date(appData.end);
        
        events.push(appData);
      });

      console.log(events);
      commit('SET_EVENTS_FOR_COM_LOC', events);
    },
  
    async getCurrentUser({commit}) {
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid)
      const dbResults = await getDoc(userDoc);
      commit('setProfileInfo', dbResults);
      commit('setProfileInitials');
    },

    async addEvent({commit}, event){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);


      let collectionName;
      let color;
      switch (event.category) {
        case 'event':
          collectionName = 'calEvent'; //light green
          color = '#87bba2'; //light green
          break;
        case 'study':
          collectionName = 'calStudy'; // dark green
          color = '#009688'; // dark green
          break;
        case 'cca':
          collectionName = 'calCCA'; // cyan
          color = '#70c1b3'; // cyan
          break;
        case 'personal':
          collectionName = 'calPersonal'; // purple
          color = '#8D6298'; // purple
          break;
        case 'class':
          collectionName = 'calClass'; // brown grey lolipop
          color = '#a6a2a2'; // brown grey lolipop
          break;
        case 'exam':
          collectionName = 'calExam'; // pink
          color = '#dec3c3'; // pink
          break;
        case 'invite':
          collectionName = 'calInvite'; // blueberry blue
          color = '#4d648d'; // blueberry blue
          break;

        default:
          collectionName = 'calEvent'; 
          color = '#87bba2';
      }

      const calCollection = collection(userDoc, collectionName);
      const eventDoc = doc(calCollection, String(event.id));

      await setDoc(eventDoc, {
        title: event.title, 
        start: String(event.start), 
        end: String(event.end),  
        allDay: Boolean(event.allDay),
        invitees: event.invitees,
        category: event.category,
      })


      // let color;
      // switch (event.category) {
      //   case 'event':
      //     color = '#87bba2'; //light green
      //     break;
      //   case 'study':
      //     color = '#009688'; // dark green
      //     break;
      //   case 'cca':
      //     color = '#70c1b3'; // cyan
      //     break;
      //   case 'personal':
      //     color = '#8D6298'; // purple
      //     break;
      //   case 'class':
      //     color = '#a6a2a2'; // brown grey lolipop
      //     break;
      //   case 'exam':
      //     color = '#dec3c3'; // pink
      //     break;
      //   case 'invite':
      //     color = '#4d648d'; // blueberry blue
      //     break;

      //   default:
      //     color = '#87bba2'; 
      // }

      commit("ADD_EVENT", {event, color});
    },


    // async addEvent({commit}, event){
    //   const currentUser = auth.currentUser;
    //   const database = collection(db, "users");
    //   const userDoc = doc(database, currentUser.uid);
    //   const calEventCollection = collection(userDoc, "calEvent");
    //   const eventDoc = doc(calEventCollection, String(event.id));

    //   await setDoc(eventDoc, {
    //     title: event.title, 
    //     start: String(event.start), 
    //     end: String(event.end),  
    //     allDay: Boolean(event.allDay),
    //     invitees: event.invitees,
    //     category: event.category,
    //   })

    //   let color;
    //   switch (event.category) {
    //     case 'event':
    //       color = '#87bba2'; //light green
    //       break;
    //     case 'study':
    //       color = '#009688'; // dark green
    //       break;
    //     case 'cca':
    //       color = '#70c1b3'; // cyan
    //       break;
    //     case 'personal':
    //       color = '#8D6298'; // purple
    //       break;
    //     case 'class':
    //       color = '#a6a2a2'; // brown grey lolipop
    //       break;
    //     case 'exam':
    //       color = '#dec3c3'; // pink
    //       break;
    //     case 'invite':
    //       color = '#4d648d'; // blueberry blue
    //       break;

    //     default:
    //       color = '#87bba2'; 
    //   }
    

    //   commit("ADD_EVENT", {event, color});
    // },

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
        category: 'exam',
      })

      let color = '#ffdfba' //light green
      event.category = 'exam';


      commit("ADD_EVENT", {event, color});
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
        category: 'class',
      })

      let color = '#a6a2a2'; // brown grey
      event.category = 'class';

      commit("ADD_EVENT", {event, color});
    },

    async updateEvent({commit}, event){
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
      }, {merge: true});

      commit("UPDATE_EVENT", event);
    },

    async deleteEvent({commit}, event){
      let eventId = event.id;
      let invitees = event.invitees;
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      console.log(event.category);

      let collectionName;
      switch (event.category) {
        case 'event':
          collectionName = 'calEvent'; //light green
          break;
        case 'study':
          collectionName = 'calStudy'; // dark green
          break;
        case 'cca':
          collectionName = 'calCCA'; // cyan
          break;
        case 'personal':
          collectionName = 'calPersonal'; // purple
          break;
        case 'class':
          collectionName = 'calClass'; // brown grey lolipop
          break;
        case 'exam':
          collectionName = 'calExam'; // pink
          break;
        case 'invite':
          collectionName = 'calInvite'; // blueberry blue
          break;
        default:
          collectionName = 'calEvent'; 
      }

      console.log(collectionName);
      const calCollection = collection(userDoc, collectionName);
      const eventDoc = doc(calCollection, eventId);
      console.log(eventDoc);
      console.log('iseventdoc there',eventDoc);

      console.log(invitees);

      if (invitees){
      invitees.forEach( async(invitee)=> {
        const inviteeDoc = doc(database, invitee.id);
        const calInviteCollection = collection(inviteeDoc, "calInvite");
        const inviteDoc = doc(calInviteCollection, eventId);
        await deleteDoc(inviteDoc);
      });
      }
    
      await deleteDoc(eventDoc);

      commit("DELETE_EVENT", eventId);
    },

    async deleteCol({commit}){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);
      // const calEventCollection = collection(userDoc, "calEvent");
      const calClassCollection = collection(userDoc, "calClass");
      const calExamCollection = collection(userDoc, "calExam");
    
      // Get a new write batch
      let batch = writeBatch(db);
    
      // Delete documents in a batch
      // const qEvent = query(calEventCollection);
      // const querySnapshotEvent = await getDocs(qEvent);
      // querySnapshotEvent.forEach((doc) => {
      //   batch.delete(doc.ref);
      // });
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
        commit('INVITEE_EXIST', false);
      } else {
        const userId = inviteeDocs.docs[0].id;
        
        let inviteeObj = {};
        inviteeDocs.forEach((inviteeDoc) => {
          inviteeObj['id'] = inviteeDoc.id;
          inviteeObj['email'] = inviteeDoc.data().email;
        });


        // fetch user's timeslots to find common timeslots
        const userDoc = doc(database, userId);
        const calEventCollection = collection(userDoc, "calEvent");
        const calClassCollection = collection(userDoc, "calClass");
        const calExamCollection = collection(userDoc, "calExam");

        let events = [];

        const qEvent = query(calEventCollection);
        const querySnapshotEvent = await getDocs(qEvent);
        querySnapshotEvent.forEach((doc) => {
          let appData = doc.data();
          appData.id = doc.id;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);

        });
        const qClass = query(calClassCollection);
        const querySnapshotClass = await getDocs(qClass);
        querySnapshotClass.forEach((doc) => {
          let appData = doc.data();
          appData.id = doc.id;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });


        const qExam = query(calExamCollection);
        const querySnapshotExam = await getDocs(qExam);
        querySnapshotExam.forEach((doc) => {
          let appData = doc.data();
          appData.id = doc.id;
          appData.start = new Date(appData.start);
          appData.end = new Date(appData.end);
          events.push(appData);
        });

        inviteeObj['events'] = events;
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
      commit('SET_PENDING_INVITES', pendingEvents);
    }, 

    async acceptInvite({commit},event) {
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
            invitee.status = 'accepted';
          }
          return invitee;
        })
      }, {merge: true});

      const inviteeDoc = doc(database, currentUserId);
      const calInviteCollection = collection(inviteeDoc, "calInvite");
      const inviteDoc = doc(calInviteCollection, String(event.id));


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

      commit('UPDATE_PENDING_EVENTS', event);

      event.color = '#4d648d'; // blueberry blue
      
      commit('ADD_INVITE_EVENTS_TO_CALENDAR', event);
    },

    async declineInvite({commit},event) {
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
            invitee.status = 'declined';
          }
          return invitee;
        })
      }, {merge: true});
     
      // const docAfterSet = await getDoc(eventDoc);
      // console.log(docAfterSet.data());
      // console.log(event);
      commit('UPDATE_PENDING_EVENTS', event);

    },

    async updateProfileGoals(_, userSettings){
      const currentUser = auth.currentUser;
      const database = collection(db, "users");
      const userDoc = doc(database, currentUser.uid);

      await setDoc(userDoc, {
       goals: userSettings,
      }, {merge: true});
    }, 
    async fetchProfileGoals() {
      const currentUser = auth.currentUser;
      const database = collection(db, 'users');
      const userDoc = doc(database, currentUser.uid);

      const dbResults = await getDoc(userDoc);
      return dbResults.data().goals;
    },

    // async fetchDailyTasks(_, dailyTasks, day) {
    //   const currentUserId = auth.currentUser.uid;
    //   const database = collection(db, "users");
    //   const userDoc = doc(database, currentUserId);
    //   const calDailyCollection = collection(userDoc, "dailyTasks");

    //   // create 


    // }

  },
  modules: {},
});
