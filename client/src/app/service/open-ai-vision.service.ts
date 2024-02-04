import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/env';
@Injectable({
  providedIn: 'root',
})
export class OpenAiVisionService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  classifyImage(imageUrl: string): Observable<any> {
    const body = {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: "Please select the correct method for recycling the item from the options provided below. "  
            + "Your answer should only be the number from the options without the dot. Options: 1. Place in the glass recycling bin. 2. "
            +" Return to a grocery store collection point. 3. Place in the metal recycling bin. 4. Place in the paper recycling bin. 5." 
            +"Dispose of in general waste as it cannot be recycled." },
            {
              type: 'image_url',
              image_url: imageUrl, 
            },
          ],
        },
      ],
      max_tokens: 300,
    };

    // Ideally, retrieve the API key securely, e.g., from your backend
    const headers = new HttpHeaders().set('Authorization', `Bearer ${environment.openAiApiKey}`);

    return this.http.post(this.apiUrl, body, { headers });
  }
}
