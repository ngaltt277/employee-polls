import { connect } from "react-redux";
import Nav from "./Nav";

function Leaderboard({ users, userIds }) {
  return (
    <>
      <Nav currentActive="leaderboard" />
      <div className="w-full my-6 flex items-center justify-center">
        <table className="w-[70%] border-[1px] rounded">
          <tbody>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-start text-sm border-[1px]">
                Users
              </th>
              <th className="py-2 px-3 text-start text-sm border-[1px]">
                Answered
              </th>
              <th className="py-2 px-3 text-start text-sm border-[1px]">
                Created
              </th>
            </tr>
            {userIds.map((userId) => {
              const { id, name, avatarURL, answers, questions } = users[userId];
              return (
                <tr key={id} id="record">
                  <td className="py-2 px-3 border-[1px]">
                    <div className="flex gap-2 items-center">
                      <img src={avatarURL} alt="avatar" className="w-7 h-7" />
                      <div>
                        <p className="font-bold">{name}</p>
                        <p className="text-sm text-gray-500">{id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3 border-[1px]">
                    {Object.keys(answers).length}
                  </td>
                  <td className="py-2 px-3 border-[1px]">{questions.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

const mapStateToProps = ({ users }) => ({
  users,
  userIds: Object.keys(users).sort(
    (a, b) =>
      Object.keys(users[a].answers) +
      users[a].questions.length -
      (Object.keys(users[b].answers) + users[b].questions.length)
  ),
});

export default connect(mapStateToProps)(Leaderboard);
