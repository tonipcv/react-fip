import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { WebView } from 'react-native-webview';

interface Episode {
  id: number;
  title: string;
  duration: string;
  thumbnail: any;
  number: number;
  videoId: string;
}

export default function Courses() {
  const [activeEpisode, setActiveEpisode] = useState<number | null>(null);

  const episodes: Episode[] = [
    {
      id: 1,
      title: "Como pegar as entradas dos sinais da forma correta",
      duration: "2:30",
      thumbnail: require('../../assets/thumb.jpg'),
      number: 1,
      videoId: "73a6f2ac-16c8-4234-acf7-462a2d2a8fb9"
    },
    {
      id: 2,
      title: "Como ativar as notificações do Grupo de Sinais",
      duration: "2:30",
      thumbnail: require('../../assets/thumb1.jpg'),
      number: 2,
      videoId: "a3644631-7ce5-4fac-a3a6-4d55cb933cfd"
    }
  ];

  const currentEpisode = episodes.find(ep => ep.id === activeEpisode);

  return (
    <View style={styles.container}>
      {currentEpisode ? (
        // Video Player View
        <View style={styles.videoContainer}>
          <WebView
            source={{
              html: `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                    <style>
                      body {
                        margin: 0;
                        padding: 0;
                        background-color: black;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                      }
                      .video-container {
                        position: relative;
                        width: 100%;
                        padding-top: 56.25%;
                      }
                      iframe {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: none;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="video-container">
                      <iframe
                        src="https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=${currentEpisode.videoId}"
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                        allowfullscreen="true"
                      ></iframe>
                    </div>
                  </body>
                </html>
              `
            }}
            style={styles.video}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={false}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4ade80" />
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            scrollEnabled={false}
            bounces={false}
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setActiveEpisode(null)}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.videoTitle}>{currentEpisode.title}</Text>
        </View>
      ) : (
        // Course Content View
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Curso Futuros Tech</Text>
            <Text style={styles.headerSubtitle}>
              Passo a passo para ter um aproveitamento máximo com as entradas da tecnologia
            </Text>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.episodesSection}>
              <Text style={styles.sectionTitle}>Episódios</Text>
              {episodes.map((episode) => (
                <TouchableOpacity
                  key={episode.id}
                  style={[
                    styles.episodeCard,
                    activeEpisode === episode.id && styles.episodeCardActive
                  ]}
                  onPress={() => setActiveEpisode(episode.id)}
                >
                  <Image
                    source={episode.thumbnail}
                    style={styles.episodeThumbnail}
                  />
                  <View style={styles.episodeInfo}>
                    <Text style={styles.episodeNumber}>Aula {episode.number}</Text>
                    <Text style={styles.episodeTitle}>{episode.title}</Text>
                    <Text style={styles.episodeDuration}>{episode.duration}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Assista o curso:</Text>
                <Text style={styles.infoText}>
                  A tecnologia é a melhor ferramenta hoje para operar, mas sem saber como usar você não terá o aproveitamento máximo.
                </Text>
                <View style={styles.warningBox}>
                  <Text style={styles.warningText}>
                    Este conteúdo tem caráter informativo e educacional.
                  </Text>
                </View>
              </View>

              <View style={styles.materialsCard}>
                <Text style={styles.materialsTitle}>Materiais Complementares</Text>
                <TouchableOpacity 
                  style={styles.materialLink}
                  onPress={() => {/* Implement link handling */}}
                >
                  <Text style={styles.materialLinkText}>Black Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 50,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#999',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  episodesSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  episodeCard: {
    flexDirection: 'row',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  episodeCardActive: {
    backgroundColor: '#333',
    borderLeftWidth: 4,
    borderLeftColor: '#4ade80',
  },
  episodeThumbnail: {
    width: 100,
    height: 60,
    borderRadius: 4,
  },
  episodeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  episodeNumber: {
    color: '#4ade80',
    fontSize: 14,
    fontWeight: '600',
  },
  episodeTitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  episodeDuration: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  infoSection: {
    padding: 16,
  },
  infoCard: {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
  },
  warningBox: {
    backgroundColor: 'rgba(4, 120, 87, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(4, 120, 87, 0.5)',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  warningText: {
    color: '#4ade80',
    fontSize: 12,
  },
  materialsCard: {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    borderRadius: 8,
    padding: 16,
  },
  materialsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  materialLink: {
    padding: 8,
    borderRadius: 8,
  },
  materialLinkText: {
    color: '#fff',
    fontSize: 14,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#111',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
}); 