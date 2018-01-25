import Services from './services'

export default {
  async setAnswer({
    state
  }, opts) {
    // console.log(opts)
    const res = await Services.setQuizTest(opts.uid, opts.inputName, opts.finalAnswer)
    // const res = await Services.setQuizAnswer(uid, inputName, type, finalAnswer)
    // state.answer = consequence
    state.answer = res
    return res
  },
  getWechatOAuth({ commit }, url) {
    return Services.getWechatOAuth(url)
  },
  setAuthUser({ commit }, authUser) {
    commit('SET_AUTHUSER', authUser)
  },
  setInputName({ commit }, inputName) {
    commit('SET_INPUTNAME', inputName)
  }

}
