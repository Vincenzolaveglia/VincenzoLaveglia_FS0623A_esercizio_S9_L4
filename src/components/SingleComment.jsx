import { Button, ListGroup } from "react-bootstrap";

const SingleComment = ({ comment }) => {
    const deleteComment = async (asin) => {
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MzgyYmI1MjViYjAwMThlZDA3Y2QiLCJpYXQiOjE3MDMxNjM5NDcsImV4cCI6MTcwNDM3MzU0N30.oLybOZIaj9HlO4gmlLDixn5BDY5PN1brytD7gXP2cI0',
                    },
                }
            )
            if(response.ok) {
                alert('Commento cancellato con successo')
            } else {
                alert('Errore - il commento non è stato cancellato')
            }
        } catch (error) {
            alert('Errore - il commento non è stato cancellato')
        }
    }

    return (
        <ListGroup.Item className="d-flex justify-content-between">
            {comment.comment}
            <Button variant="danger" onClick={() => deleteComment(comment._id)}>
                Elimina
            </Button>
        </ListGroup.Item>
    )
}

export default SingleComment;