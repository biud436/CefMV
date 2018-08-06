using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Media;
using NAudio.Wave;
using NAudio.Vorbis;
using System.Threading;
using System.Diagnostics;

class SoundManager
{

    private Dictionary<string, NAudio.Vorbis.VorbisWaveReader> _musicMap = null;
    private Dictionary<string, NAudio.Vorbis.VorbisWaveReader> _soundMap = null;

    // DirectSoundOut은 볼륨 조절이 불가능하므로, WaveOut으로 교체
    private NAudio.Wave.WaveOut musicPlayer = null;
    private NAudio.Wave.WaveOut soundPlayer = null;

    //EventWaitHandle _ewh = new EventWaitHandle(false, EventResetMode.ManualReset);

    public enum SoundType
    {
        MUSIC = 1,
        SOUND
    };

    public SoundManager()
    {
        _musicMap = new Dictionary<string, NAudio.Vorbis.VorbisWaveReader>();
        _soundMap = new Dictionary<string, NAudio.Vorbis.VorbisWaveReader>();
        musicPlayer = new NAudio.Wave.WaveOut();
        soundPlayer = new NAudio.Wave.WaveOut();
    }

    public bool Load(string fileName, string id, SoundType type)
    {

        if(type == SoundType.MUSIC)
        {
            NAudio.Vorbis.VorbisWaveReader soundPlayer = new NAudio.Vorbis.VorbisWaveReader(fileName);
            if (soundPlayer != null)
            {
                _musicMap.Add(id, soundPlayer);
                return true;
            }
        }

        if (type == SoundType.SOUND)
        {
            NAudio.Vorbis.VorbisWaveReader soundPlayer = new NAudio.Vorbis.VorbisWaveReader(fileName);
            if (soundPlayer != null)
            {
                _soundMap.Add(id, soundPlayer);
                return true;
            }

        }

        return false;

    }

    public void PlayMusic(string id, bool isLooping)
    {
        NAudio.Vorbis.VorbisWaveReader data = _musicMap[id];
        if (data != null)
        {
            musicPlayer.Init(data);
            musicPlayer.Play();
        }
}


    public void PlaySound(string id, bool isLooping)
    {
        NAudio.Vorbis.VorbisWaveReader data = _soundMap[id];
        if (data != null)
        {
            soundPlayer.Init(data);
            soundPlayer.Play();
        }
    }

    public void StopMusic(string id)
    {
        NAudio.Vorbis.VorbisWaveReader data = _musicMap[id];
        if (data != null)
        {
            musicPlayer.Stop();
            data.Position = 0;
            data.Dispose();
            _musicMap.Remove(id);
        }
    }

    public void StopSound(string id)
    {
        NAudio.Vorbis.VorbisWaveReader data = _soundMap[id];
        if (data != null)
        {
            soundPlayer.Stop();
            data.Position = 0;
            data.Dispose();
            _soundMap.Remove(id);
        }
    }

    public float SetMusicVolume(float f)
    {
        
        // 0.0 ~ 1.0 사이로 값을 조정합니다.
        f = f / 100.0f;

        if(f < 0f)
        {
            f = 0.0f;
        }

        if(f > 1.0f)
        {
            f = 1.0f;
        }

        musicPlayer.Volume = f;

        return musicPlayer.Volume;

    }

    public void Dispose()
    {
        if (soundPlayer.PlaybackState == NAudio.Wave.PlaybackState.Playing) soundPlayer.Stop();
        if (musicPlayer.PlaybackState == NAudio.Wave.PlaybackState.Playing) musicPlayer.Stop();
        soundPlayer.Dispose();
        musicPlayer.Dispose();
        soundPlayer = null;
        musicPlayer = null;
        _musicMap.Clear();
        _soundMap.Clear();
    }


}