/**
 * Created by 73497 on 2017/2/27.
 */
Vue.component('input-element',{
    template:'#input-template',
    props:['type','name','info','value'],
    methods:{
        onBlur: function (e) {
            this.$emit('validate', e.target.value);
            console.log(e)
            console.log(e.target.value)
        },
        updateValue: function (e) {
            this.$emit('input',e.target.value)
            console.log('e',e)
            console.log(e.target.value)
        }
    }
})
Vue.component('reg',{
    template:'#reg-template',
    data: function () {
        return {
            username:{
                info:'',
                a:false,
                value:''
            },
            pwd:{
                info:'',
                a:false,
                value:''
            },
            twoPwd:{
                info:'',
                a:false
            },
            email:{
                info:'',
                a:false,
                value:''
            }
        }
    },
    methods:{
        validateText: function (value) {
            console.log('e',value)
            if(/^[0-9a-zA-Z]{6,16}$/.test(value)){
                console.log('222',this.username.value)
                ajax({
                    type:'post',
                    url:'/users/find',
                    data:{
                        findType:'exact',
                        username:this.username.value
                    },
                    success: function (data) {
                        console.log('10',data)
                        if(data.length>0){
                            this.username.info='重名';
                            this.username.a=false
                        }else{
                            this.username.info='格式正确'
                            this.username.a=true
                        }
                    }.bind(this)
                })
            }else{
                this.username.info='格式不正确'
                this.username.a=false
            }
        },
        validatePwd: function (value) {
            if(/^[0-9a-zA-Z]{6,16}$/.test(value)){
                this.pwd.info='密码格式正确'
                this.pwd.a=true

            }else{
                this.pwd.info='密码格式不正确'
                this.pwd.a=false
            }
        },
        validateTwoPwd: function (value) {
            console.log(value,this.$refs.pwd.$refs.input.value)
            if(this.$refs.pwd.$refs.input.value==''){
                this.twoPwd.info='请输入密码'
                this.twoPwd.a=false
            } else if(value==this.$refs.pwd.$refs.input.value){
                this.twoPwd.info='密码一致'
                this.twoPwd.a=true
            }else{
                this.twoPwd.info='密码不一致'
                this.twoPwd.a=false
            }
        },
        validateEmail: function (value) {
            if(/^[0-9a-zA-Z]+@[0-9a-zA-Z]+.[0-9a-zA-Z]{2,3}$/.test(value)){
                this.email.info='格式正确';
                this.email.a=true
            }else{
                this.email.info='格式不正确';
                this.email.a=false

            }
        },
        reg: function (e) {
            console.log(22, e.target)
            if(this.username.a&&this.twoPwd.a&&this.pwd.a&&this.email.a){
                ajax({
                    type:'post',
                    url:'/users/add',
                    data:{
                        username:this.username.value,
                        pwd:this.pwd.value,
                        email:this.email.value
                    },
                    success: function (data) {
                        alert('注册成功')
                        window.location='login.html'
                    }
                })
            }else{
                alert('信息提交有误，请重新输入')
            }
        },
    },
});
var stu=new Vue({
    el:'#stu',
    data:{
        info:0,
        isShow:false
    },
    methods:{
        btn: function () {
            this.isShow=true;
            this.info++
        }
    }
})
var reg=new Vue({
    el:'#reg',
    data:{
    }
})
