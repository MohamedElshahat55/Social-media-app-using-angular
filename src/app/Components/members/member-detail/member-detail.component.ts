import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../_models/member';
import { MemberService } from '../../../_Services/member.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent {
  constructor(
    private _route: ActivatedRoute,
    private _memberService: MemberService
  ) {}

  //?Variables
  member: Member | undefined;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false,
      },
    ];

    this.galleryImages = this.getImages();
  }

  getImages() {
    if (!this.member) return [];
    const imagesUrl = [];
    for (const photo of this.member.photos) {
      imagesUrl.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      });
    }
    return imagesUrl;
  }

  loadMember() {
    const username = this._route.snapshot.paramMap.get('username');
    if (!username) return;
    this._memberService.getMember(username).subscribe({
      next: (res) => {
        this.member = res;
        this.galleryImages = this.getImages();
      },
      error: (err) => console.log(err),
    });
  }
}
