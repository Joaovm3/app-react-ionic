/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './ExploreContainer.css';
import { 
  IonAlert, 
  IonAvatar, 
  IonBadge,
   IonButton,
   IonCard,
   IonCardContent,
   IonCardHeader,
   IonCardTitle,
   IonChip,
   IonCol,
   IonContent,
   IonHeader,
   IonImg,
   IonInput,
   IonItem,
   IonItemDivider,
   IonLabel,
   IonList,
   IonRow,
   IonText,
  } from '@ionic/react';

const ExploreContainer: React.FC = () => {
  const [githubData, setGithubData] = useState<any>('');
  const [repositories, setRepositories] = useState<any[]>([]);
  const [user, setUser] = useState<string>('Joaovm3');

  const handleSearch = () => {
    fetchGithubData();
    fetchRepositores();
  }

  const fetchRepositores = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`https://api.github.com/users/${user}/repos`);
    const data = await response.json();
    setRepositories(data);
  }

  const fetchGithubData = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
    setGithubData(data);
  }

  return (
    <>
      <div>
        <div id="container">
          <IonText color="primary">
            <h1> <b> Bem vindo ao Meu Site </b> </h1>
          </IonText>

          <IonText color="success"> Esse é um parágrafo de exemplo </IonText>

          <div className="ion-padding">
            <IonButton id="present-alert">Clique aqui </IonButton>
            <IonAlert
              trigger="present-alert"
              header="Alerta"
              subHeader="Você clicou no botão de alerta"
              message="Isso é uma mensagem super legal!"
              buttons={['OK']}
              ></IonAlert>
            </div>

          <div className="container-outline">
            <IonText>
              <h2> <b> Seção importante </b> </h2>
            </IonText>

            <IonText color="success"> Esse é uma seção com conteudo importante </IonText>
          </div>

          <IonImg className="logo" src="assets/icon/logo.png" />
          <IonItemDivider></IonItemDivider>
      
          <IonRow className="ion-justify-content-center ion-margin-vertical">
            <IonCol size="8">
              <IonItem className="input" fill="outline">
                <IonLabel position="floating">Digite o seu nome no github</IonLabel>
                <IonInput onIonChange={e => setUser(e.detail?.value ?? '')}></IonInput>
              </IonItem>
            </IonCol>

            <IonCol size="4">
              <IonButton onClick={handleSearch} style={{ marginTop: 10 }}> Pesquisar</IonButton>
            </IonCol>
          </IonRow>
        </div>

        <div>
          {user && githubData && (
            <IonContent style={{ height: '100vh'}}>
              <IonList>
                <IonHeader color="primary" className="header-list">
                  <IonRow>
                    <IonAvatar>
                      <img src={githubData.avatar_url} />
                    </IonAvatar>  
                    
                    <h2 className="ion-padding-start">
                      <IonLabel> Repositórios do </IonLabel>
                      <IonLabel className="username">
                        {githubData.name}
                      </IonLabel>
                    </h2>
                  </IonRow>
                </IonHeader>
                
                {repositories && repositories.map((item, index) => (
                  <IonItem key={index}>
                    <IonCard color="primary" style={{ width: '100%' }}>
                      <IonCardHeader>
                        <IonRow className="ion-align-items-center">
                          <IonCardTitle>{item.name}</IonCardTitle>
                          <IonChip className="ion-margin-horizontal" outline={true}>{item.private ? 'Privado' : 'Público'}</IonChip>
                          <IonBadge color="dark">{item.stargazers_count}</IonBadge>
                        </IonRow>
                      </IonCardHeader>

                      <IonCardContent>
                        <IonText>
                          {item.description}
                        </IonText>
                        <br/>
                        <IonButton color="light" className="ion-margin-vertical" expand="full" href={item.html_url}>Ir para o repositório</IonButton>
                      </IonCardContent>
                    </IonCard>
                  </IonItem>
                ))}
              </IonList>
            </IonContent>
          )}    
        </div>
      </div>
    </>
  );
};

export default ExploreContainer;