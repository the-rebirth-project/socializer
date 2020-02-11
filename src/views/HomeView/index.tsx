import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { RouteComponentProps, navigate } from '@reach/router';
import { PostsProvider } from '../../contexts/PostsContext';
import { Navbar, NavbarBottomMargin } from '../../components/shared/Navbar';
import { SizedBox } from '../../components/shared/SizedBox';
import { Posts } from '../../components/specific/Posts';
import { GlobalStyles, ContentWrapper, GridContainer } from './styles';

export const HomeView: React.FC<RouteComponentProps> = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <GlobalStyles />
      <header style={{ marginBottom: `${NavbarBottomMargin}rem` }}>
        <Navbar />
      </header>
      <PostsProvider>
        <ContentWrapper>
          <GridContainer>
            <Posts />
          </GridContainer>
        </ContentWrapper>
      </PostsProvider>
      <SizedBox height={5} />
    </div>
  );
};
