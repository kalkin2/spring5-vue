import { mount , createLocalVue} from '@vue/test-utils'
import RegisterPage from '../../src/views/RegisterPage'
import VueRouter from 'vue-router'

const localVue = createLocalVue();
localVue.use(VueRouter)
const router = new VueRouter

jest.mock('@/services/registration')

describe('RegisterPage.vue', () => {
  let wrapper
  let fieldUsername
  let fieldEmailAddress
  let fieldPassword
  let buttonSubmit


  beforeEach(() => {
    wrapper = mount(RegisterPage,{localVue, router})
    fieldUsername = wrapper.find('#username')
    console.log('>>>>>>>>>11'+ wrapper.find('#username'))
    fieldEmailAddress = wrapper.find('#emailAddress')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('form button[type="submit"]')
  })

  afterAll(()=>{
    jest.restoreAllMocks()
  })

  it('should render Registration form ', () => {
    expect(wrapper.find('.logo').attributes().src).toEqual('/static/images/logo.png')
    expect(wrapper.find('.tagline').text()).toEqual('Open source task management tool')
    expect(fieldUsername.element.value).toEqual('')
    expect(fieldPassword.element.value).toEqual('')
    expect(fieldEmailAddress.element.value).toEqual('')
    expect(buttonSubmit.text()).toEqual('Create account')
  })

  it('should contain data model', () => {
   expect(wrapper.vm.form.username).toEqual('')
    expect(wrapper.vm.form.emailAddress).toEqual('')
    expect(wrapper.vm.form.password).toEqual('')
  })

  it('should have form inputs bound with data model', () => {
    const username = 'sunny2222'
    const emailAddress = 'sunny@taskagile.com'
    const password = 'VueJsRocks!'

    // wrapper.vm.form.username = username
    // wrapper.vm.form.emailAddress = emailAddress
    // wrapper.vm.form.password = password
   wrapper.setData({ username:  'sunny3333', emailAddress: emailAddress, password: password })
    expect(fieldUsername.element.value).toEqual(username)
    expect(fieldEmailAddress.element.value).toEqual(emailAddress)
    expect(fieldPassword.element.value).toEqual(password)
  })


  it('should have form submit event handler `submitForm`', () => {
    const stub = jest.fn()
    wrapper.setMethods({submitForm: stub})
    buttonSubmit.trigger('submit')
    expect(stub).toBeCalled()
  })

  it('shoud Register when it is a new User',() =>{
    const stub = jest.fn()
    wrapper.vm.$router.push = stub;
    wrapper.vm.form.username = 'sunny'
    wrapper.vm.form.emailAddress = 'sunny@local'
    wrapper.vm.form.password = 'Jest!'
    wrapper.vm.submitForm()
    wrapper.vm.$nextTick(()=>{
      expect(stub).toHaveBeenCalledWith({name: 'LoginPage'})
    })
  })

  it('shoud fail it is not a new user',()=>{
      //mock에서는 오직 sunny@local만 새로운 사용자이다
      wrapper.vm.form.emailAddress = 'ted@local'
      expect(wrapper.find('./failed').isVisible()).toBe(false)
      wrapper.vm.submitForm()
      wrapper.vm.$nextTick(numm, () => {
      expect(wrapper.find('.failed').isVisible()).toBe(true)
    })
  })

})
