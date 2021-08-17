import React, { useContext } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { users } from '../../dataMock/users'
import userContext from '../../store/userContext'
import checkoutContext from '../../store/checkoutState'
function NavbarComponent() {
    const userStore = useContext(userContext);
    const checkoutStore = useContext(checkoutContext);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Checkout</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                    <NavDropdown title={userStore.user} id="collasible-nav-dropdown">
                        {users.map((user) => <NavDropdown.Item
                            key={user}
                            onClick={() => {
                                userStore.setUser(user)
                                checkoutStore.updatePriceRules()
                            }
                            }
                        >
                            {user}
                        </NavDropdown.Item>)}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarComponent
