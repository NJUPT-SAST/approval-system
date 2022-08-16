import React from 'react'

type userProfileType = {
  code: string //学号
  name: string //姓名
  logout: () => void
}
const UserProfile: React.FC<userProfileType> = (props) => {
  const { code, name, logout } = props
  return (
    <div className="user-profile">
      <div className="avatar"></div>
      <div className="user-profile-code">
        <span>{code}</span>
        {name}
      </div>
      <div className="user-profile-school">南京邮电大学</div>
      <div className="userprofile-logout">
        <button className="userprofile-logout-button" onClick={logout}>
          退出登录
        </button>
      </div>
    </div>
  )
}

export default UserProfile
