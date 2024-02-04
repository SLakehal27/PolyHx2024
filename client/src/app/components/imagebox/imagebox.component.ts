import { Component } from '@angular/core';
import { OpenAiVisionService } from '../../service/open-ai-vision.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from '../../service/file-upload-service.service';
import { PopupComponent } from '../../components/popup/popup.component';

@Component({
  selector: 'app-imagebox',
  templateUrl: './imagebox.component.html',
  styleUrls: ['./imagebox.component.css'],
})
export class ImageboxComponent {
  constructor(
    private visionService: OpenAiVisionService,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        this.uploadAndClassifyImage(file);
      } else {
        this.openPopup(
          'The file extention should be: .jpg, .jpeg or .png',
          'The dropped file is not an image'
        );
      }
    }
  }

  onClick() {
    const input = document.querySelector('input');
    if (input?.files) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        this.uploadAndClassifyImage(file);
      } else {
        this.openPopup(
          'The file extention should be: .jpg, .jpeg or .png',
          'The dropped file is not an image'
        );
      }
    }
  }

  uploadAndClassifyImage(file: File) {
    this.fileUploadService.uploadFile(file).subscribe({
      next: (url) => {
        if (url) {
          // Now that you have the URL, you can call classifyImage with it
          this.classifyImage(url);
        }
      },
      error: (err) => this.openPopup(err, 'Error uploading image'),
    });
  }

  classifyImage(imageUrl: string) {
    this.visionService.classifyImage(imageUrl).subscribe({
      next: (response) => {
        const classificationResult = parseInt(
          response.choices[0].message.content
        );
        const message = this.getMessageForClassification(classificationResult);
        this.openPopup(message);
      },
      error: (err) => this.openPopup(err, 'Error'),
    });
  }

  getMessageForClassification(classification: number): string {
    const options = [
      'This item does not fit any of the provided categories.',
      'Place in the glass recycling bin.',
      'Return to a grocery store collection point.',
      'Place in the metal recycling bin.',
      'Place in the paper recycling bin.',
      'Dispose of in general waste as it cannot be recycled.',
    ];

    // Return the message corresponding to the classification or a default message
    return (
      options[classification] ||
      'Unable to classify the item. Please try again.'
    );
  }

  openPopup(content: string, title?: string) {
    // Open the popup/modal with the content
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { content: content, title: title },
      width: '600px',
      height: '400px',
      panelClass: 'custom-popup',
    });
  }
}
