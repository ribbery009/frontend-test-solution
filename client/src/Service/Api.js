import Api from './Axios-order'

export default {
  fetchTodos () {
    return Api().get('todos')
  },
 
  addTodo (params) {
    Api().post('todos', params) 
  },

  updateTodo (params) {
    Api().patch('todos/' + params.id, params)
  },

  deleteTodo (params) {
    Api().delete('todos/' + params.id)
  }
}
