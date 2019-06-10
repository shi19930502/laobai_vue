/**
 * Created by 73497 on 2017/2/27.
 */
Vue.component('input-element',{
    template:'#input-template',
    props:['type','info','value'],
    methods:{
        updateValue: function (e) {
            this.$emit('input',e.target.value)
        }
    }
});
Vue.component('login',{
    template:'#login-template',
    methods:{
        loginBtn: function (e) {
            console.log(e.target)
            console.log(this.username.value)
            console.log(this.pwd.value)
            if(this.username.value==''&&this.pwd.value==''){
                alert('请输入账号密码')
            }else{
                ajax({
                    type:'post',
                    url:'/users/find',
                    data:{
                        findType:'exact',
                        username:this.username.value,
                        pwd:this.pwd.value
                    },
                    success: function (data) {
                        if(data.length>0){
                            alert('登陆成功')
                        }else{
                            alert('账号或者密码错误')
                        }
                    }
                })

            }
        }
    },
    data: function () {
        return {
            username:{
                value:''
            },
            pwd:{
                value:''
            }
        }
    }
})
var app=new Vue({
    el:'#app'
})