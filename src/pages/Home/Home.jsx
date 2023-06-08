import css from './Home.module.css'

export default function Home() {
    return (
        <div className={css.container}>
        <h1 className={css.title}>
          Tweets
        </h1>
        <h2 className={css.subtitle}>
        Welcome to the site of user tweets. Here you can view user cards.
        </h2>
      </div>
    );
  }