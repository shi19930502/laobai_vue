/**
 * Created by 73497 on 2017/2/27.
 */
Vue.component('students',{
    template:'#students',
    data: function () {
        return {
            data:{},
            student:{}
        };
    },
    created: function (){
        this.show();
    },
    methods:{
        show: function (page) {
            ajax({
                type:'get',
                url:'/students/find',
                data:{
                    page:page,
                    rows:5
                },
                success: function (data) {
                    this.data=data;
                    console.log(this.data)
                }.bind(this)
            })
        },
        updateStu: function (student) {
            console.log(student)
            this.student=student
            console.log('studentAA',this.student)
        }
    }
})
Vue.component('input-element',{
    template:'#input-template',
    props:['type','value'],
    methods:{
        updateValue: function (e) {
            this.$emit('input',e.target.value)
        }
    }
})
Vue.component('radio',{
    template:'#radio-template',
    props:['value'],
    methods:{
        sex: function (e) {
            this.$emit('input',e.target.value)
        }
    }
})
Vue.component('search',{
    template:'#search-template',
    props:[],
    data: function () {
        return {
            text:'',
            value:'',
            name:'',
            age:'',
            gender:''
        }
    },
    methods:{
        selectChange: function () {
            console.log(this.text)
            console.log(this.value)
        },
        searchBtn: function () {
            console.log(this.value)

            if(this.text=='����'){
                this.name=this.value
            }else if(this.text=='����'){
                this.age=this.value
            }else if(this.text=='�Ա�'){
                this.gender=this.value
            }
            console.log(this.name)
            ajax({
                type:'post',
                url:'/students/find',
                data:{
                    name:this.name,
                    age:this.age,
                    sex:this.gender,
                },
                success: function (data) {
                    console.log(data)
                }
            })
        }
    }
})
Vue.component('update',{
    template:'#update-template',
    props:['show','student'],
    data: function () {
      return {
      }
    },
    methods:{
        update: function () {
            console.log(this.student)
            ajax({
                type:'post',
                url:'/students/update',
                data:{
                    _id:this.student._id,
                    name:this.student.name,
                    age:this.student.age,
                    gender:this.student.gender
                },
                success:  ()=> {
                    this.student.name=''
                    this.student.age=''
                    this.student.gender=''
                        this.show()
                }
            })
        }
    }
})
Vue.component('add',{
    template:'#add-template',
    props:['show'],
    data: function () {
      return {
          name:'',
          age:'',
          gender:''
      }
    },
    methods:{
        add: function () {
            if(this.name==''&&this.age==''&&this.gender==''){
                alert('������Ҫ���ӵ���Ϣ')
            }else{
                ajax({
                    type:'post',
                    url:'/students/add',
                    data:{
                        name:this.name,
                        gender:this.gender,
                        age:this.age
                    },
                    success:()=> {
                        this.name=''
                        this.gender=''
                        this.age=''
                        this.show()
                    }
                })
            }

        }
    }
})
Vue.component('student-list',{
    template:'#table-template',
    props:['data','show','updateStu'],
    methods:{
        del: function (id) {
            console.log(id)
            ajax({
                type:'post',
                url:'/students/del',
                data:{
                    _id:id
                },
                success:  (data)=>{
                    this.show()
                }
            })
        },
        update: function (id) {
            console.log(id)
            ajax({
                type:'post',
                url:'/students/find',
                data:{
                    _id:id
                },
                success:  (data)=>{
                    this.updateStu(data)
                }
            })
        }
    }
})
Vue.component('page',{
    template:'#page-template',
    props:['show','data']
})
var app=new Vue({
    el:'#app',
})
