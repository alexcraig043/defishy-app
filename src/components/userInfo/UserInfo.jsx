import "./UserInfo.scss";

const UserInfo = ({ name }) => {
  return (
    <div className="userInfo">
      <div className="editButton">Edit</div>
      <div className="title">Information</div>
      <div className="item">
        <img
          src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          alt=""
          className="itemImg"
        />
        <div className="details">
          <h1 className="itemTitle">{name}</h1>
          <div className="detailItem">
            <span className="itemKey">Email:</span>
            <span className="itemValue">janedoe@gmail.com</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Phone:</span>
            <span className="itemValue">+1 123 456 789</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Address:</span>
            <span className="itemValue">123 Main Street, New York City</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">Country:</span>
            <span className="itemValue">USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
