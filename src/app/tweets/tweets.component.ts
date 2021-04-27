import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MentionConfig } from 'angular-mentions';

declare var require: any;
@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css'],
})
export class TweetsComponent implements OnInit {
  dateFormat: any;
  tweetData = '';
  userName: any;
  baseUrl: any = 'https://tweetapp-api.azurewebsites.net/tweetapp/';
  userData: any;
  replyData: any;
  allTweets: any;
  checkLength: number;
  hashtag: any;
  replyHashtag: any;
  checkReplyLength: any;

  mockTweet: any = [];
  replyTweetData: any = [];

  constructor(private http: HttpClient, public toastr: ToastrService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('token');
    let userNameUrl = this.baseUrl + this.userName;
    this.http.get(userNameUrl).subscribe((result) => {
      this.userData = result;
      console.log('UserData:', this.userData);
    });
    let getTweetUrl = this.baseUrl + 'tweets';
    this.http.get(getTweetUrl).subscribe((result) => {
      this.allTweets = result;
      console.log('AllTweets::', this.allTweets);
    });
  }
  postTweet() {

    this.mockTweet = [];

    this.hashtag = this.tweetData.match(/#[a-zA-Z0-9\_]+/gi);
    if (this.hashtag) {
      for (var i = 0; i < this.hashtag.length; i++) {
        if (this.hashtag[i].length > 51) {
          this.checkLength = this.hashtag[i].length;
          break;
        }
      }
      console.log(this.checkLength);
      if (this.checkLength > 51) {
        this.toastr.error('Hashtag cannot be more than 50 characters');
        this.checkLength = 0;
      } else {
        let dateTime = new Date().getTime();
        let dateFormat = formatDate(
      dateTime,
      'yyyy-MM-dd HH:mm:ss',
      'en'
    ).toString();
        this.mockTweet = {
          createdOn: dateFormat,
          body: this.tweetData,
          postedBy: '',
          loginId: this.userName,
          replies: [],
        };

        let postTweetUrl = this.baseUrl + 'tweets/tweet';

        this.http.post('http://localhost:5000/tweetapp/tweets/tweet', this.mockTweet).subscribe(
          (result) => {
            this.toastr.success('Tweet Posted Successfully!!!');

            this.getAllTweets();
          },
          (error) => {
            this.toastr.error('Cannot Post Tweet due to some technical error');
          }
        );
        this.tweetData = '';
      }
    } else {
      let dateTime = new Date().getTime();
    let dateFormat = formatDate(
      dateTime,
      'yyyy-MM-dd HH:mm:ss',
      'en'
    ).toString();
      this.mockTweet = {
        createdOn: dateFormat,
        body: this.tweetData,
        postedBy: '',
        loginId: this.userName,
        replies: [],
      };

      let postTweetUrl = this.baseUrl + 'tweets/tweet';

      this.http.post('http://localhost:5000/tweetapp/tweets/tweet', this.mockTweet).subscribe(
        (result) => {
          this.toastr.success('Tweet Posted Successfully!!!');

          this.getAllTweets();
        },
        (error) => {
          this.toastr.error('Cannot Post Tweet due to some technical error');
        }
      );
      this.tweetData = '';
    }

    // var lengths = this.hashtag.map(function(word){
    //   // this.checkLength= word.length
    //   console.log(word.length)
    //  })
    //  if(this.checkLength-1>=50)
    //  {
    //    this.toastr.error('Hashtag cannot be more than 50 characters')
    //  }

    console.log('tweet-data:::', this.tweetData);
  }
  getAllTweets() {
    let getTweetUrl = this.baseUrl + 'tweets';
    this.http.get(getTweetUrl).subscribe((result) => {
      this.allTweets = result;

      console.log('AllTweets::', this.allTweets);
    });
  }
  replyTweet(replyId, replyData) {
    if (replyData.length == 0 || replyData.trim() == '') {
      this.toastr.error('Please Enter Something Before Replying');
    } else {
      this.replyHashtag = replyData.match(/#[a-zA-Z0-9\_]+/gi);
      if (this.replyHashtag) {
        for (var i = 0; i < this.replyHashtag.length; i++) {
          if (this.replyHashtag[i].length > 51) {
            this.checkReplyLength = this.replyHashtag[i].length;
            break;
          }
        }
        if (this.checkReplyLength > 51) {
          this.toastr.error('Hashtag cannot be more than 50 characters');
          this.checkReplyLength = 0;
        } else {
          let dateTime = new Date().getTime();
          let dateFormat = formatDate(
            dateTime,
            'yyyy-MM-dd HH:mm:ss',
            'en'
          ).toString();
          console.log('reply-data', replyData);
          this.replyTweetData = {
            replyBody: replyData,
            replyTimestamp: dateFormat,
            repliedBy: '',
            replyLoginId: this.userName,
            tweetId: replyId,
          };
          let replyUrl = this.baseUrl + 'replies/reply';
          this.http.post(replyUrl, this.replyTweetData).subscribe((result) => {
            this.toastr.success('You replied to the tweet');
            this.getAllTweets();
          });
          this.replyData = '';
          console.log('replied::', this.replyTweetData);
        }
      } else {
        let dateTime = new Date().getTime();
        let dateFormat = formatDate(
          dateTime,
          'yyyy-MM-dd HH:mm:ss',
          'en'
        ).toString();
        console.log('reply-data', replyData);
        this.replyTweetData = {
          replyBody: replyData,
          replyTimestamp: dateFormat,
          repliedBy: '',
          replyLoginId: this.userName,
          tweetId: replyId,
        };
        let replyUrl = this.baseUrl + 'replies/reply';
        this.http.post(replyUrl, this.replyTweetData).subscribe((result) => {
          this.toastr.success('You replied to the tweet');
          this.getAllTweets();
        });
        this.replyData = '';
        console.log('replied::', this.replyTweetData);
      }
    }
  }
}
