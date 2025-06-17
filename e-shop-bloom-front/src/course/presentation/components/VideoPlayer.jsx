import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaExpand, FaCheckCircle } from "react-icons/fa";

export default function VideoPlayer({ 
  lesson, 
  onLessonComplete,
  isLoading 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);

  useEffect(() => {
    if (lesson) {
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [lesson]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Marcar como completado cuando se ve el 90% del video
      const progress = videoRef.current.currentTime / videoRef.current.duration;
      if (progress >= 0.9 && !lesson.isCompleted) {
        onLessonComplete?.(lesson.id);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (isLoading || !lesson) {
    return (
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="aspect-video bg-gray-800 flex items-center justify-center">
          <div className="animate-pulse text-white">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
              <FaPlay className="text-2xl ml-1" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          poster="/images/video-poster.jpg"
        >
          <source src={lesson.videoUrl} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30">
          <button
            onClick={togglePlay}
            className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 transform hover:scale-110"
          >
            {isPlaying ? (
              <FaPause className="text-3xl text-gray-800" />
            ) : (
              <FaPlay className="text-3xl text-gray-800 ml-1" />
            )}
          </button>
        </div>

        {/* Lesson Status Badge */}
        {lesson.isCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
            <FaCheckCircle className="text-sm" />
            <span className="text-sm font-medium">Completado</span>
          </div>
        )}
      </div>

      {/* Video Controls Bar */}
      <div className="bg-gray-800 p-4">
        {/* Progress Bar */}
        <div 
          className="w-full h-2 bg-gray-600 rounded-full cursor-pointer mb-4"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="hover:text-primary transition-colors duration-200"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <div className="flex items-center gap-2">
              <FaVolumeUp className="text-sm" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume;
                  }
                }}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="hover:text-primary transition-colors duration-200"
          >
            <FaExpand />
          </button>
        </div>
      </div>

      {/* Video Info */}
      <div className="bg-white p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {lesson.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {lesson.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Duración: {lesson.duration}</span>
          {lesson.isCompleted && (
            <span className="text-green-600 font-medium">
              ✓ Completado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
