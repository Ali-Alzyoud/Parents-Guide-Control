using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Windows.Forms;

namespace ParentGuideEditor
{
    public partial class MainForm : Form
    {
        OpenFileDialog fd_video = new OpenFileDialog();
        public MainForm()
        {
            InitializeComponent();
        }

        private void openVideoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if(fd_video.ShowDialog() == DialogResult.OK)
            {
                string path = fd_video.FileName;
                openVideo(path);
            }
        }

        private void openVideo(string path)
        {
            var options = new string[] { "-vvv" };
            Uri fUri = new Uri("file://" + path);
            vlcControl.VlcMediaPlayer.SetMedia(fUri, options);
            Btn_Play.Enabled = true;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            vlcControl.PositionChanged += VlcControl_PositionChanged;
            vlcControl.Playing += VlcControl_Playing;
            vlcControl.Paused += VlcControl_Paused;
            vlcControl.Stopped += VlcControl_Stopped;
            Btn_Play.Enabled = false;
            Progress_Play.Minimum = 0;
            Progress_Play.Maximum = 100;
        }

        private void VlcControl_Stopped(object sender, Vlc.DotNet.Core.VlcMediaPlayerStoppedEventArgs e)
        {
            BeginInvoke((MethodInvoker)delegate () {
                this.Btn_Play.Text = "Play";
                Progress_Play.Value = 0;
                vlcControl.Stop();
            });
        }

        private void VlcControl_Paused(object sender, Vlc.DotNet.Core.VlcMediaPlayerPausedEventArgs e)
        {
            BeginInvoke((MethodInvoker)delegate () {
                this.Btn_Play.Text = "Play";
            });
        }

        private void VlcControl_Playing(object sender, Vlc.DotNet.Core.VlcMediaPlayerPlayingEventArgs e)
        {
            BeginInvoke((MethodInvoker)delegate () {
                this.Btn_Play.Text = "Pause";
            });
        }

        private void VlcControl_PositionChanged(object sender, Vlc.DotNet.Core.VlcMediaPlayerPositionChangedEventArgs e)
        {
            BeginInvoke((MethodInvoker)delegate () {
                Progress_Play.Value = (int)(101 * (float)vlcControl.Position);
            });
        }

        private void Btn_Play_Click(object sender, EventArgs e)
        {
            if (vlcControl.IsPlaying)
            {
                vlcControl.Pause(); 
            }
            else
            {
                vlcControl.VlcMediaPlayer.Play();
            }
        }
    }
}
