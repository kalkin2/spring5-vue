export default {
  register (detail) {
    return new Promis((resolve, reject) => {
      detail.emalAddress === 'sunny@local' ? resolv({result: 'success'}) : reject(new Error('User already exist'))
    })
  }
}
