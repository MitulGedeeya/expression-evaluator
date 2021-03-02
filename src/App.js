import React, {Component} from 'react'
import './App.css'

class App extends Component {
    state = {
        formulaParts: [],
        firstOperand: null,
        operand: null,
        operator: '+',
        answer: null,
        formula: '',
        showOperandError: false
    }

    setFirstOperand = () => {
        if (this.state.firstOperand === null || this.state.firstOperand === undefined || this.state.firstOperand === '') {
            this.setState({showOperandError: true})
            return false
        }

        this.setState({
            formulaParts: [this.state.firstOperand],
            formula: `${this.state.firstOperand}`,
            answer: this.state.firstOperand,
            showOperandError: false
        })
    }


    prepareAnswer = () => {
        if (!this.state.operand || !this.state.operator) {
            this.setState({showOperandError: true})
            return false
        }

        const formula = `${this.state.formula} ${this.state.operator} ${this.state.operand}`
        const answer = eval(formula)

        this.setState({
            formula,
            answer,
            formulaParts: [...this.state.formulaParts, this.state.operand, this.state.operator],
            operand: '',
            showOperandError: false
        })

        this.myFormRef.value = null
    }

    render() {

        if (this.state.formulaParts.length === 0) {
            return (
                <div className="d-flex flex-wrap align-items-center justify-content-center screen">
                    <div className="d-flex flex-wrap align-items-center justify-content-center">
                        <div>
                            <input
                                type="number"
                                className="form-control form-control-lg d-sm-w-50"
                                placeholder="Please enter a number"
                                value={this.state.firstOperand}
                                onChange={(e) => {
                                    this.setState({firstOperand: e.target.value})
                                }}/>
                            <div className="text-danger ml-2 text-left"
                                 style={{visibility: `${this.state.showOperandError ? 'visible' : 'hidden' }`}}>Please enter a valid value
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg mb-4 btn-outline-primary ml-4"
                                    onClick={this.setFirstOperand}>Add
                                Number
                            </button>
                        </div>

                    </div>
                </div>
            )
        }

        return (
            <div className="d-flex flex-wrap align-items-center justify-content-center screen">
                <div className="flex-wrap align-items-center justify-content-center text-center evaluation-container">
                    <div>
                        <div className="d-flex flex-wrap justify-content-center">
                            {
                                this.state.formulaParts.map((operationItem, index) => {
                                    return (
                                        <div className="p-4 m-1 formula-part" key={index}>{operationItem}</div>
                                    )
                                })

                            }
                        </div>
                        <div className="equals-text">=</div>
                        <div className="mb-5 answer-text">{ this.state.answer.toString() }</div>
                    </div>
                    <div>
                        <div className="d-flex">
                            <div className="w-50 mx-2">
                                <select className="custom-select custom-select-lg "
                                        placeholder="Operator"
                                        onChange={(e) => {
                                            this.setState({operator: e.target.value})
                                        }}>
                                    <option value="+">+</option>
                                    <option value="-">-</option>
                                    <option value="*">*</option>
                                    <option value="/">/</option>
                                </select>
                            </div>
                            <div className="w-50 mx-2">
                                <input type="number" className="form-control form-control-lg "
                                       ref={(el) => this.myFormRef = el} placeholder="Operand"
                                       onChange={(e) => {
                                           this.setState({operand: e.target.value})
                                       }}/>
                                <div className="text-danger ml-2 text-left mt-2"
                                     style={{visibility: `${this.state.showOperandError ? 'visible' : 'hidden' }`}}>Invalid operand
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.prepareAnswer} className="btn btn-lg btn-outline-primary mt-5">Add
                        Operation
                    </button>
                </div>
            </div>
        )
    }
}

export default App
