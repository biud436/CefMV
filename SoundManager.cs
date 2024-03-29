﻿using System;
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

    // The DirectSoundOut couldn't control the sound volume, So I'd changed as the WaveOut.
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

    public static string GetAppLocation()
    {
        return AppDomain.CurrentDomain.BaseDirectory;
    }

    public bool LoadMusic(string fileName, string id)
    {
        string path = string.Format(@"{0}www\audio\bgm\{1}", GetAppLocation(), fileName);
        return Load(path, id, SoundType.MUSIC);
    }

    public bool LoadSound(string fileName, string id)
    {
        string path = string.Format(@"{0}www\audio\se\{1}", GetAppLocation(), fileName);
        return Load(path, id, SoundType.SOUND);
    }

    private bool Load(string fileName, string id, SoundType type)
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

    public void PlayMusic(string id)
    {
        NAudio.Vorbis.VorbisWaveReader data = _musicMap[id];
        if (data != null)
        {
            musicPlayer.Init(data);
            musicPlayer.Play();
        }
    }


    public void PlaySound(string id)
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
        
        f = f * 0.01f;

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