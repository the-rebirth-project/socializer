import React, { useEffect } from 'react';
import { PostsProvider } from '../../contexts/PostsContext';
import { Navbar, NavbarBottomMargin } from '../../components/shared/Navbar';
import { SizedBox } from '../../components/shared/SizedBox';
import { PostAdd } from '../../components/specific/PostAdd';
import firebase from 'firebase/app';
import 'firebase/auth';
import { RouteComponentProps, navigate } from '@reach/router';
import { Posts } from '../../components/specific/Posts';
import { GlobalStyles, GridContainer, ContentWrapper } from './styles';

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
            <PostAdd />
            <Posts />
          </GridContainer>
        </ContentWrapper>
      </PostsProvider>
      <SizedBox height={5} />
    </div>
  );
};
