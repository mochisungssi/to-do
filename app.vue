<template>
  <div id="app-body">
    <!-- <NuxtWelcome /> -->
    <div class="container">
      <div class="text-center">
        <h1 style="color: white">Vue To-do List</h1>
        <v-card width="550px">
          <v-card-title class="container-header text-right">
            <v-chip class="pr-0 pl-3 mr-2 chip">
              Tasks
              <template v-slot:append>
                <v-badge
                  color="white"
                  :content="countOngoing"
                  inline
                ></v-badge>
              </template>
            </v-chip>
            <v-chip class="pr-0 pl-3 mr-2 chip">
              Tasks Done
              <template v-slot:append>
                <v-badge
                  color="white"
                  :content="countDone"
                  inline
                ></v-badge>
              </template>
            </v-chip>
            <v-btn v-if="countDone > 0" density="compact" variant="flat" color="#ea5a5a" class="btn mr-2 pa-1"
              @click="deleteDoneTasks()">
              <v-icon class="mr-2">mdi-delete</v-icon>
              Tasks Done
            </v-btn>
            <v-btn v-if="countOngoing > 0" density="compact" variant="flat" color="#ea5a5a" class="btn pa-1"
              @click="deleteOngoingTasks()">
              <v-icon class="mr-1">mdi-delete</v-icon>
              Tasks
            </v-btn>
          </v-card-title>

          <!-- LIST OF TASKS -->
          <v-card-text class="pa-4 task-lists">
            <span v-if="show_done" style="color:green">A task is marked as done!</span>
            <span v-if="show_delete" style="color:crimson">A task is removed from the list!</span>
            <div v-if="countOngoing == 0">
              <center>
                No On-going task as of now
              </center>
            </div>
            <v-list density="compact">
              <v-list-item
                v-for="(task, i) in tasks"
                :key="i"
                :value="task"
                color="primary"
                class="task-container mb-2"
                @mouseover="hover_i = i"
                @mouseleave="hover_i = -1"
                v-show="!task.status.done"
              >
                <template v-slot:prepend>
                    <v-btn icon="mdi-check-circle" variant="plain" color="#41b883" @click="updateTask(i)"></v-btn>
                  </template>
                  <v-list-item-title v-text="task.name" class="text-left ml-2"></v-list-item-title>
                  <template v-slot:append>
                    <v-btn v-show="hover_i == i" icon="mdi-delete" variant="plain" color="error" @click="deleteTask(i)"></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>

          <!-- FOOTER / ADD TASK -->
          <div class="container-footer pa-4">
            <v-text-field
              density="compact"
              variant="solo"
              label="Add Task"
              append-inner-icon="mdi-plus-circle"
              single-line
              hide-details
              v-model="newTask"
              @keyup.enter="addTask()"
              @click:append-inner="addTask()"
            ></v-text-field>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
// import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    c_index: -1,
    tasks: [],
    newTask: "",
    hover: false,
    hover_i: -1,
    show_done: false,
    show_delete: false
  }),
  computed: {
    countOngoing(){
      let count = 0
      this.tasks.filter(rec=>{
        if(!rec.status.done){
          count += 1
        }
      })
      return count
    },
    countDone(){
      let count = 0
      this.tasks.filter(rec=>{
        if(rec.status.done){
          count += 1
        }
      })
      return count
    }
  },
  mounted(){
    this.tasks = this.$store.state.tasks
  },
  methods: {
    addTask(){
      let taskObj = {
        id: this.tasks.length,
        name: this.newTask,
        status: {
          done: false
        }
      }
      this.tasks.push(taskObj)
      this.newTask = ""
      this.$store.commit('STORE_TASKS', this.tasks)
    },
    updateTask(i){
      this.show_done = true
      setTimeout(() => {
        this.tasks[i].status.done = true
        this.show_done = false
      }, 2000);
      this.$store.commit('STORE_TASKS', this.tasks)
    },
    deleteTask(i){
      this.tasks.splice(i, 1)
      this.show_delete = true
      setTimeout(() => {
        this.show_delete = false
      }, 2000);
      this.$store.commit('STORE_TASKS', this.tasks)
    },
    deleteDoneTasks(){
      let tempArr = this.tasks.filter(rec=>{
        //return only the tasks with !DONE status
        if(!rec.status.done){
          return rec
        }
      })
      this.tasks = tempArr
      this.$store.commit('STORE_TASKS', this.tasks)
    },
    deleteOngoingTasks(){
      let tempArr = this.tasks.filter(rec=>{
        //return only the tasks with DONE status
        if(rec.status.done){
          return rec
        }
      })
      this.tasks = tempArr
      this.$store.commit('STORE_TASKS', this.tasks)
    },
  }
}
</script>

<style>
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #808080
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #34495e; 
  }
  #app-body{
    background: linear-gradient(180deg, #41b883, #34495e);
    height: 100vh;
    width: 100%;
    position: relative
  }
  .container{
    position: absolute;
    top: 25%;
    left: 32%;
  }
  .container-header, .container-footer{
    background-color: #ccc
  }
  .chip{
    background: #0d5ec2;
    color: white
  }
  .task-container{
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 1px 2px 1px #cccccc86
  }
  .check-icon{
    color: #41b883;
    font-size: 35px
  }
  .task-lists{
    height: 200px;
    overflow: auto;
  }
  .btn{
    text-transform: capitalize;
    font-size: 13px;
    color: white
  }
  .done{
    text-decoration: line-through !important;
  }
</style>