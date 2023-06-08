import { formatNumber } from "../../services/FetchUser";
import css from "./TweetCard.module.css";
import image from "../../images/Picture.jpg";
import logo from "../../images/Logo.jpg";
import avatar from "../../images/Boy.jpg";

export const TweetCard = ({ user, onFollow }) => {
  const followers = formatNumber(user.followers);
  const tweets = formatNumber(user.tweets);

  const handleFollow = () => {
    onFollow(user.id);
  };

  const avatarSource = user.avatar ? user.avatar : avatar;

  return (
    <li className={css.item}>
      <img src={logo} alt="logo" className={css.logo} />
      <img src={image} alt="question mark and exclamation mark" className={css.image} />
      <img src={avatarSource} alt={user.user} className={css.avatar} />
      <div className={css.tagline}></div>
      <div className={css.box}>
        <p className={css.text}>{tweets} tweets</p>
        <p className={css.text}>{followers} followers</p>
      </div>

      <button
        type="button"
        onClick={handleFollow}
        className={`${css.button} ${user.follow ? css.button_follow : ""}`}
      >
        {user.follow ? "following" : "follow"}
      </button>
    </li>
  );
};