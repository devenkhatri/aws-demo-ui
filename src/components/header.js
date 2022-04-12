import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Flex, useTheme, View, Button, Heading, Text, Icon, Image } from "@aws-amplify/ui-react"

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
            <Flex>
          {/* <Icon
  pathData="M27.4194 82.4091H62.9094L72 98.4091H71.7439H0L25.2809 54.6012L35.8752 36.2564L44.971 52.0175L27.4194 82.4091ZM40.6554 27.9603L49.3888 12.8276L98.8145 98.4088H81.3109L40.6554 27.9603ZM54.2496 4.40906H71.7299L126 98.4091H108.498L54.2496 4.40906Z"
  viewBox={{
    width: 24,
    height: 24,
  }}
  color="var(--amplify-colors-brand-primary-60)"
  ariaLabel="Logo"
/> */}
<Icon
  pathData="M27.4193646,78 L62.9093796,78 L72,94 L71.743892,94 L0,94 L25.2808604,50.192137 L35.8751825,31.8473288 L44.9710103,47.6084247 L27.4193646,78 Z M40.6554116,23.5512493 L49.3887526,8.41853699 L98.814466,93.9997425 L81.3108879,93.9997425 L40.6554116,23.5512493 Z M54.249635,0 L71.7299104,0 L126,94 L108.497716,94 L54.249635,0 Z"
  viewBox={{
    width: 24,
    height: 24,
  }}
  // color="var(--amplify-colors-brand-primary-60)"
  ariaLabel="Logo"
/>
          {/* <svg viewBox="0 0 644 125" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M27.4194 82.4091H62.9094L72 98.4091H71.7439H0L25.2809 54.6012L35.8752 36.2564L44.971 52.0175L27.4194 82.4091ZM40.6554 27.9603L49.3888 12.8276L98.8145 98.4088H81.3109L40.6554 27.9603ZM54.2496 4.40906H71.7299L126 98.4091H108.498L54.2496 4.40906Z" fill="var(--amplify-colors-brand-primary-60)"></path></svg> */}
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
