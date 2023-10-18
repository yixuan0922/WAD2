<template>
</template>

<script>
// import { db } from '@/main';
import { db, auth } from "../firebase/firebaseInit";
import {collection, doc, getDocs} from 'firebase/firestore';
import Fullcalendar from '@fullcalendar/vue'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'

export default {
    name: 'Calendar',
    data: () => ({
      components: {
        Fullcalendar
      }, 
      calendarPlugins: [
            DayGridPlugin,
            TimeGridPlugin,
            InteractionPlugin,
            ListPlugin
        ], 
        // today: new Date().toISOString(0, 10),
        // focus: new Date().toISOString(0, 10),
        // type: "month", 
        // typeToLabel: {
        //     month: "Month", // actual type: actual label  
        //     week: "Week", 
        //     day: "Day", 
        //     "4day" : "4 Days"
        // },
        name: null, 
        agenda: null,
        start: null, 
        end: null, 
        location: null, 
        category: null, 
        color: '#1976D2',
        currentlyEditing: null, 
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false, 
        events: [],
        dialog: false, 

    }), 
    mounted() {
        this.getEvents(); 
    },
    methods: {
        async getEvents(){
        const currentUser = auth.currentUser;
        const database = collection(db, "users");
        const userDoc = doc(database, currentUser.uid)
        const calEventCollection = collection(userDoc, "calEvent");
        let snapshot = await getDocs(calEventCollection);
        snapshot.forEach(doc => {
            console.log('doc', doc.data());
            // let appData = doc.data()
            // appData.id = doc.id
            // events.push(appData)
        })
    }
}


};
</script>