export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'https://fitnesstrac-kr.herokuapp.com';

// REGISTER A USER
export async function registerUser(username, password) {
  const url = `${BASE_URL}/api/users/register`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const {token} = await response.json()
    localStorage.setItem("token", JSON.stringify(token))
  } catch (error) {
    console.log(error)
  }
}

// LOGIN USER
export async function loginUser(usernameValue, passwordValue) {
  const url = `${BASE_URL}/api/users/login`
  console.log(usernameValue, passwordValue)

  try {
      const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify({
              user: {
                  username: usernameValue,
                  password: passwordValue
              }
          })  
      })
      const { token } = await response.json()
      localStorage.setItem("token", JSON.stringify(token))
  } catch (error) {
      console.log(error)
  }
}