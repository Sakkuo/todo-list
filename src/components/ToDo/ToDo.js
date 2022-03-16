import React from 'react'
import { connect } from 'react-redux'
import { deleteTodo, fetchTodos, successHandle, fetchColumns } from '../../store/actions/todos'
import {createColumn, addColumnTo, deleteColumn, testPostColumns, changeColumnName} from '../../store/actions/columns'
import { addTodoTo, createTodo } from '../../store/actions/form'
import './ToDo.css'

class ToDo extends React.Component {

    isWrite = []
    isTodoCreating = []


    state = {
        columnName: 'Базовая колонка',
        todoName: ''
    }

    handlerColumn = (ind) => {
        if (this.isWrite[ind]) {
        this.isWrite = this.isWrite.map((item, i) => {
            if (i === ind) {
                return item = true
            } else {
            return item = false
            }
        })
        } else {
            this.isWrite = this.isWrite.map((item, i) => {
                return item = false
                }
            )
        }
        this.isWrite[ind] = !this.isWrite[ind]
    }


    handlerTodo = (ind) => {
        if (this.isTodoCreating[ind]) {
        this.isTodoCreating = this.isTodoCreating.map((item, i) => {
            if (i === ind) {
                return item = true
            } else {
            return item = false
            }
        })
        } else {
            this.isTodoCreating = this.isTodoCreating.map((item, i) => {
                return item = false
                }
            )
        }
        this.isTodoCreating[ind] = !this.isTodoCreating[ind]
    }

    renderColumns = () => {
        return this.props.columns.map((column, ind) => {
            const columnId = column.id

            this.isTodoCreating.push(false)
            this.isTodoCreating.length = this.props.columns.length

            this.isWrite.push(false)
            this.isWrite.length = this.props.columns.length

            return (
                <div
                key={ind}
                className='divTodos'
                >
                    <form onSubmit={(e) => this.submitHandler(e, ind, columnId)}>
                        <div className='articleOfColumn'>
                        {
                                this.isWrite[ind]
                                ?
                                <button>
                                    <i 
                                        onClick={() => {
                                            this.handlerColumn(ind)
                                            this.props.fetchColumns()
                                            }
                                        }
                                        className="fa-solid fa-check iconHeader">
                                    </i>
                                </button>
                                :
                                <i 
                                    onClick={() => {
                                        this.handlerColumn(ind)
                                        this.props.fetchColumns()
                                        }
                                    }
                                    className="fa-solid fa-pen iconHeader">
                                </i>
                            }

                            <h1 style={
                                this.isWrite[ind] 
                                ? {margin: '0px',
                                    padding: '0 14px 0 0 '
                                } 
                                : null
                            }>
                            
                                {
                                this.isWrite[ind]
                                ? <input 
                                placeholder='Введите название колонки' 
                                defaultValue={column.name[0].name}
                                onChange={(e) => {
                                    this.setState({
                                        columnName: e.currentTarget.value
                                    })
                                }}
                                />
                                : column.name[0].name
                                }
                            </h1>
                            <i 
                            onClick={() => {
                                this.props.deleteColumn(column.id)
                            }}
                            className="fa-solid fa-trash-can iconHeader"></i>
                        </div>
                    </form>
                    {this.renderTodos(ind, columnId)}
                    {
                        this.isTodoCreating[ind]
                        ? <div className='inputTodoName'>
                            <form onSubmit={(e) => this.submitToDoHandler(e, ind, columnId)}>
                                <input placeholder='Введите задачу' autoFocus
                                    onChange={(e) => {
                                        this.setState({
                                            todoName: e.currentTarget.value
                                        })
                                    }}
                                />
                                <button>
                                <i style={{fontSize: '20px'}} className="fa-solid fa-check"

                                ></i>
                                </button>
                            </form>
                        </div>
                        : null
                    }

                        {
                        !this.isTodoCreating[ind]
                        ? 
                        <div
                        className='plusUnderTodos'
                        onClick={() => {
                            this.handlerTodo(ind)
                            this.props.fetchTodos()
                        }}
                        >
                            +
                        </div>
                        : 
                        null
                        }
                </div>
            )
        })
    }

    submitHandler = (e, ind, columnId) => {
        e.preventDefault()

        setTimeout(() => {
            this.props.changeColumnName(ind, columnId, this.state.columnName)
        }, 150)
    }

    submitToDoHandler = (e, ind, columnId) => {
        e.preventDefault()
        this.props.createTodo(this.state.todoName)
        setTimeout(() => {
            this.props.addTodoTo(columnId)
        }, 50);
        this.setState({
            todoName: ''
        })
        this.handlerTodo(ind)
        setTimeout(() => {
            this.props.fetchColumns()
        }, 300);
    }



    renderTodos = (ind, columnId) => {

        const todoss = []
        if (this.props.columns[ind].name[0].todos) {
            Object.entries(this.props.columns[ind].name[0].todos).forEach((key) => {
                todoss.push({
                    name: key[1],
                    id: key[0]
                })
            })
        }
        return todoss.map((todo, i) => {

            return (
                <div
                key={todo.id}
                className={ 
                    todoss[i].name[1].successToDo ? 'todoName successToDoDiv' : 'todoName'
                }
                onClick={() => this.props.successHandle(todo.id, i, columnId, ind)}
                >
                    <div 
                    className={ 
                        todoss[i].name[1].successToDo ? 'present successToDo' : 'present'
                    }
                    >
                        {todoss[i].name[0]}
                    </div>
                    <div>
                        <i
                        onClick={() => setTimeout(() => {
                            this.props.deleteTodo(todo.id, columnId)
                        }, 150)}
                        className="fa-solid fa-trash-can buttonDelete"></i>

                    </div>
                </div>
            )
        })
    }

    componentDidMount() {
            this.props.fetchColumns()
    }


    stateColumn = {
        name: 'Базовая колонка'
    }

    creationColumn = () => {
        this.props.createColumn(this.stateColumn)
        setTimeout(() => {
            this.props.addColumnTo()
        }, 50);
        this.props.testPostColumns()
            this.props.fetchColumns()
    }

    render() {
        return (
            <div className="scroll">
                <div className='allDivToDo inner'>
                    {
                        this.renderColumns()
                    }
                    <div className='divTodos createColumn'
                    onClick={() => 
                        {
                            this.creationColumn()
                            this.setState({
                                columnName: 'Базовая колонка'
                            })
                        }
                    }
                    >
                        <h1 >Создать новую колонку</h1>
                        <h2>+</h2>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStatetoProps (state) {
    return {
        todos: state.todos.todos,
        columns: state.todos.columns
    }
}


function mapDispatchtoProps (dispatch) {
    return {
        fetchTodos: () => dispatch(fetchTodos()),
        deleteTodo: (item, columnId) => dispatch(deleteTodo(item, columnId)),
        successHandle: (id, i, columnId, ind) => dispatch(successHandle(id, i, columnId, ind)),
        createColumn: (column) => dispatch(createColumn(column)),
        addColumnTo: () => dispatch(addColumnTo()),
        fetchColumns: () => dispatch(fetchColumns()),
        deleteColumn: (id) => dispatch(deleteColumn(id)),
        testPostColumns: () => dispatch(testPostColumns()),
        changeColumnName: (ind, columnId, value) => dispatch(changeColumnName(ind, columnId, value)),
        addTodoTo: (columnId) => dispatch(addTodoTo(columnId)),
        createTodo: (item) => dispatch(createTodo(item))
    }
}


export default connect(mapStatetoProps,mapDispatchtoProps) (ToDo) 