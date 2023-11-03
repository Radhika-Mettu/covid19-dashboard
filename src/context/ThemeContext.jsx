import React from 'react'

const ThemeContext = React.createContext({
  darkMode: true,
  changeMode: () => {},
})

export default ThemeContext
