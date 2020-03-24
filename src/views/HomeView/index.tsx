import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { PostsProvider } from '../../contexts/PostsContext';
import { Page } from '../../components/shared/Page';
import { Posts } from '../../components/specific/Posts';
import { GlobalStyles, ContentWrapper, GridContainer } from './styles';

export const HomeView: React.FC<RouteComponentProps> = () => {
  return (
    <Page>
      <GlobalStyles />
      <PostsProvider>
        <ContentWrapper>
          <GridContainer>
            <Posts />
          </GridContainer>
        </ContentWrapper>
      </PostsProvider>
    </Page>
  );
};
