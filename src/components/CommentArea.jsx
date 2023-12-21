import React from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends React.Component {
    state = {
        comments: [],
        isLoading: true,
        isError: false,
    }

    componentDidMount = async () => {
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' +
                this.props.asin,
                {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MzgyYmI1MjViYjAwMThlZDA3Y2QiLCJpYXQiOjE3MDMxNjM5NDcsImV4cCI6MTcwNDM3MzU0N30.oLybOZIaj9HlO4gmlLDixn5BDY5PN1brytD7gXP2cI0',
                    },
                }
            )
            console.log(response)
            if(response.ok) {
                let comments = await response.json()
                this.setState({ comments: comments, isLoading: false, isError: false })
            } else {
                console.log('error')
                this.setState({ isLoading: false, isError: true })
            }
        } catch (error) {
            console.log(error)
            this.setState({ isLoading: false, isError: true})
        }
    }

    render() {
        return (
            <div className="text-center">
                {this.state.isLoading && <Loading />}
                {this.state.isError && <Error />}
                <AddComment asin = {this.props.asin} />
                <CommentList commentsToShow={this.state.comments} />
            </div>
        )
    }
}

export default CommentArea;