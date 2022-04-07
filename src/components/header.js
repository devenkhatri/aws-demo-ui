import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Flex, useTheme, View, Button, Heading, Text } from "@aws-amplify/ui-react"

const Header = ({ siteTitle, signOut, user }) => {
  const { tokens } = useTheme();
  console.log("***** user",user)
  // Returns an array of groups
  const groups = user && user.signInUserSession.accessToken.payload["cognito:groups"];
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
          <Heading level={2} textAlign={{base: 'center', large: 'left'}}>
            <Link
              to="/"
              style={{ color: tokens.colors.brand.primary[100], textDecoration: `none` }}
            >
              {siteTitle}
            </Link>
          </Heading>
        </View>
        <View width="100%">
          <Flex justifyContent="flex-end" alignItems="center" alignContent="center" direction={{ base: 'column', large: 'row' }}>
            <Text><strong>User:</strong> {user && user.username}, <strong>Group: </strong>{groups}</Text>
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
