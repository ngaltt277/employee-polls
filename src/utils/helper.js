export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function checkIsAnswered(question, authedUser) {
  const { optionOne, optionTwo } = question;

  return (
    optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)
  );
}
