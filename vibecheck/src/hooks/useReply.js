import { useState, useEffect } from "react";

const useReply = (props) => {
    const [isreplying, setIsReplying] = useState(false);

    const[reply, setReply] = useState({
        replyID: "",
        reply: "",
        postID: "",
        user: "",
        username: "",
        avatar: ""
    })

    useEffect(() => {}, [reply]);

    const handleReplyChange = (e) => {
        e.persist();
        setReply((reply) => ({ ...reply, [e.target.name]: e.target.value }));
    }

    /**
     * Creates a reply object and adds it to local storage.
     * @param {*} e 
     */
    const handleReplySubmit = (e) => {
        if (e) e.preventDefault();

        const thisReply = { ...reply };

        props.addReply(thisReply)
    }

    /**
     * Toggles whether a user is repling to a post.
     */
    const toggleIsReplying = () => {
        setIsReplying(!isreplying);
    }

    return {
        handleReplyChange,
        handleReplySubmit,
        setReply,
        reply,
        isreplying,
        toggleIsReplying,
    }
}

export default useReply;