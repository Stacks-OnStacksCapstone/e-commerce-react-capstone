import UserProfile from "../components/user/UserProfile"
import ReactDOM from 'react-dom'
import { render, screen } from "@testing-library/react"

it('renders UserProfile without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<UserProfile></UserProfile>, div)
})