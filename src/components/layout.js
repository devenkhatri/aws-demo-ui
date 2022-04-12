/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import 'antd/dist/antd.css';
import '@aws-amplify/ui-react/styles.css';
import "./layout.css"

import { Amplify } from 'aws-amplify';

import { Authenticator, Heading, Image, Text, Flex, useAuthenticator, useTheme, View, Button } from '@aws-amplify/ui-react';

import { AmplifyProvider, Theme } from '@aws-amplify/ui-react';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-1',
    userPoolId: 'ap-south-1_xSlYSkp0w',
    userPoolWebClientId: '1qlfaqcfru65qknri4jpf7rpt'
  }
})

const theme = {
  name: 'local-theme',
  tokens: {
    colors: {
      font: {
        // primary: { value: '#f97316' },
      },
      brand: {
        primary: {
          // 10: { value: '#FFF0DB' },
          // 20: { value: '#FFC56D' },
          // 40: { value: '#FFB649' },
          // 60: { value: '#FFA824' },
          // 80: { value: '#ED8E00' },
          // 90: { value: '#C87800' },
          // 100: { value: '#FF9900' },
        },
      },
    },
  },
};

const amplifyHeader = (tokens, heading) => (
  <View textAlign="center" padding={tokens.space.large}>
    <Image
      alt="Amplify logo"
      src="https://docs.amplify.aws/assets/logo-dark.svg"
    />
    {heading && <Heading
      padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
      level={3}
    >
      {heading}
    </Heading>
    }
  </View>
);
const amplifyFooter = (tokens) => (
  <View textAlign="center" padding={tokens.space.large}>
    <Text>
      &copy; All Rights Reserved
    </Text>
  </View>
);

const components = {
  Header() {
    // const { tokens } = useTheme();
    return <div />;
  },

  Footer() {
    // const { tokens } = useTheme();
    return <div />;
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return amplifyHeader(tokens, "Sign in to your account");

    },
    Footer() {
      const { toResetPassword } = useAuthenticator();
      const { tokens } = useTheme();
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Forgot your password?
          </Button>
          {amplifyFooter(tokens)}
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      const { tokens } = useTheme();
      return amplifyHeader(tokens, "Create a new account");
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      const { tokens } = useTheme();
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
          {amplifyFooter(tokens)}
        </View>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return amplifyHeader(tokens, "Confirm SignUp");
    },
    Footer() {
      const { tokens } = useTheme();
      return amplifyFooter(tokens);
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return amplifyHeader(tokens, "Setup OTP");
    },
    Footer() {
      const { tokens } = useTheme();
      return amplifyFooter(tokens);
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return amplifyHeader(tokens, "Confirm SignIn");
    },
    Footer() {
      const { tokens } = useTheme();
      return amplifyFooter(tokens);
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return amplifyHeader(tokens, "Reset your Password");
    },
    Footer() {
      const { tokens } = useTheme();
      return amplifyFooter(tokens);
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return amplifyHeader(tokens, "Confirm Reset Password");
    },
    Footer() {
      const { tokens } = useTheme();
      return amplifyFooter(tokens);
    },
  },
};


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  //Temporary logging of current API URLs
  const TempLog = [
    process.env.GATSBY_SEARCH_API_URL,
    process.env.GATSBY_GETDOCUMENT_API_URL
  ]
  console.log("*** TempLog", TempLog)

  return (
    <AmplifyProvider theme={theme}>
      <Authenticator variation="modal" hideSignUp={true} components={components}>
        {({ signOut, user }) => (
          <>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`} signOut={signOut} user={user} />
            <View>
              <main>{children}</main>
              <footer
                style={{
                  marginTop: `2rem`,
                }}
              >
                <Flex justifyContent="center">
                  © Copyright `{process.env.GATSBY_SITETITLE}` {new Date().getFullYear()}.<Text variation="info"><small>Last Build # {new Date().toUTCString()}</small></Text>
                </Flex>
              </footer>
            </View>
          </>
        )}
      </Authenticator>
    </AmplifyProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
