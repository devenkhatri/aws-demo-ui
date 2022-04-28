import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Flex, useTheme, View, Button, Heading, Text, Image } from "@aws-amplify/ui-react"
import Logo from '../images/logo.png';

const Header = ({ siteTitle, signOut, user }) => {
  const { tokens } = useTheme();
  console.log("***** user", user)
  let userString = user && user.attributes && (user.attributes.name || user.attributes.email)
  if(!userString) userString = user && user.challengeParam && user.challengeParam.userAttributes && (user.challengeParam.userAttributes.name || user.challengeParam.userAttributes.email)
  if(!userString) userString = user && user.username
  // console.log("***** userString", userString)
  // Returns an array of groups
  const groups = user && user.signInUserSession.getIdToken().payload["cognito:groups"];
  return (
    <header
      style={{
        background: tokens.colors.brand.primary[10],
        // marginBottom: `1.45rem`,
        padding: '0.5rem 1rem',
      }}
    >
      <Flex direction={{ base: 'column', large: 'row' }}>
        <View width="100%">
          <Heading level={2} textAlign={{ base: 'center', large: 'left' }}>
            <Flex>
              <Image
                width="54px"
                height="48px"
                src={Logo}
                alt="Logo"
              />
              <Link
                to="/"
                style={{ color: tokens.colors.brand.primary[100], textDecoration: `none` }}
              >
                {siteTitle}
              </Link>
            </Flex>
          </Heading>
        </View>
        <View width="100%">
          <Flex justifyContent="flex-end" alignItems="center" alignContent="center" direction={{ base: 'column', large: 'row' }}>
            <Text><strong>User:</strong> {userString}, <strong>Group: </strong>{groups}</Text>
            <Button variation="primary" onClick={signOut}>Sign out</Button>
          </Flex>
        </View>
      </Flex>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
