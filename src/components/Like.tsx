import { useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";

interface Props {
  onClick: () => void
}

export default function Like({ onClick }: Props) {
    const [liked, setLiked] = useState(true);

    const toggleLikeButton = () => {
        setLiked(!liked)
        onClick()
    }

  return <BsFillHeartFill size = '40px' color = {liked ? '#ff6b81' : ''} onClick = {toggleLikeButton}/>
}
