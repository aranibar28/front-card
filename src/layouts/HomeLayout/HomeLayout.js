import React from "react";
import { createMedia } from "@artsy/fresnel";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { HomeFooter } from "../../components/Home";
import logo from "../../assets/logo.png";
import logo_min from "../../assets/logo-mini.png";
import "./HomeLayout.scss";

const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920,
  },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

const NavBarMobile = (props) => {
  const { children, leftItems, onPusherClick, onToggle, rightItems, visible } =
    props;
  const { pathname } = useLocation();
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
      
        vertical
        width="thin"
        visible={visible}
      >
        {leftItems.map((item) => (
          <Menu.Item
            {...item}
            as={Link}
            to={"../" + item.key}
            active={pathname === "/" + item.key}
          />
        ))}
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu className="menu-home">
          <Menu.Item header as={Link} to="/">
            <Image size="mini" src={logo_min} />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {rightItems.map((item) => (
              <Menu.Item
                {...item}
                as={Link}
                to={"../" + item.key}
                active={pathname === "/" + item.key}
              />
            ))}
          </Menu.Menu>
        </Menu>
        {children}
        <HomeFooter />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop = (props) => {
  const { leftItems, rightItems } = props;
  const { pathname } = useLocation();
  return (
    <Menu className="menu-home">
      <Menu.Item as={Link} to="/">
        <Image src={logo} className="logo" />
      </Menu.Item>

      {leftItems.map((item) => (
        <Menu.Item
          {...item}
          as={Link}
          to={"../" + item.key}
          active={pathname === "/" + item.key}
        />
      ))}

      <Menu.Menu position="right">
        {rightItems.map((item) => (
          <Menu.Item
            {...item}
            as={Link}
            to={"../" + item.key}
            active={pathname === "/" + item.key}
          />
        ))}
      </Menu.Menu>
    </Menu>
  );
};

const NavBarChildren = (props) => (
  <Container style={{ marginTop: "" }}>{props.children}</Container>
);

class NavBar extends React.Component {
  state = {
    visible: false,
  };

  handlePusher = () => {
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children, leftItems, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <>
        <Media at="mobile">
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Media>
        <Media greaterThan="mobile" className="pre-pusher">
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
          <HomeFooter />
        </Media>
      </>
    );
  }
}

const leftItems = [
  { as: "a", content: "Inicio", key: "" },
  { as: "a", content: "Categorías", key: "categories" },
  { as: "a", content: "Nosotros", key: "about" },
];
const rightItems = [
  { as: "a", content: "Clientes", key: "client" },
];

export function HomeLayout(props) {
  const { children } = props;

  return (
    <>
      <style>{mediaStyles}</style>
      <MediaContextProvider>
        <NavBar leftItems={leftItems} rightItems={rightItems}>
          {children}
        </NavBar>
      </MediaContextProvider>
    </>
  );
}
