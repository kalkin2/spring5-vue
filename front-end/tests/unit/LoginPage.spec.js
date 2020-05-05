import Vue from 'vue'
import LoginPage from '@/views/Loginpage'

describe('LoginPage.vue', () => {
  it('show render correct contents', () => {
   const Constuctor = Vue.extend(LoginPage)
   const vm = new Constuctor().$mount()
   expect(vm.$el.querySelector('h1').textContent).toEqual('TaskAgile')
  })
})
