import React from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"

class AddComment extends React.Component {
    state = {
        comment: {
            comment: '',
            rate: 1,
            elementId: this.props.asin,
        },
    }

    sendComment = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch(
              'https://striveschool-api.herokuapp.com/api/comments',
              {
                method: 'POST',
                body: JSON.stringify(this.state.comment),
                headers: {
                  'Content-type': 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MzgyYmI1MjViYjAwMThlZDA3Y2QiLCJpYXQiOjE3MDMxNjM5NDcsImV4cCI6MTcwNDM3MzU0N30.oLybOZIaj9HlO4gmlLDixn5BDY5PN1brytD7gXP2cI0',
                },
              }
            )
            if(response.ok) {
                alert('Il commento è stato inviato')
                this.setState({
                    comment: {
                        comment: '',
                        rate: 1,
                        elementId: this.props.asin,
                    },
                })
            } else {
                console.log('error')
                alert('Qualcosa è andato storto')
            }
        } catch (error) {
            console.log('error')
        }
    }

    render() {
        return (
            <div className="my-3">
                <Form onSubmit={this.sendComment}>
                    <FormGroup>
                        <FormLabel>Commento</FormLabel>
                        <FormControl className="mb-2" type="text" placeholder="Scrivi qui il tuo commento" value={this.state.comment.comment} onChange={(e) => this.setState({
                            comment: {
                                ...this.state.comment,
                                comment: e.target.value,
                            },
                        })
                    } />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Valutazione</FormLabel>
                        <FormControl as="select" value={this.state.comment.rate} onChange={(e) => this.setState({
                            comment: {
                                ...this.state.comment,
                                rate: e.target.value,
                            },
                        })
                    }>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </FormControl>
                    </FormGroup>
                    <Button variant="primary" type="submit" className="mt-2">Invia</Button>
                </Form>
            </div>
        )
    }
}
export default AddComment;