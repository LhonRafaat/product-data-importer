import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { EnvConfig } from '../config.type';

@Injectable()
export class GPT4Client {
  constructor(private readonly confService: ConfigService<EnvConfig>) {}

  async enhanceDescription(
    productName: string,
    productDescription: string,
  ): Promise<string> {
    const prompt = `
      You are an expert in medical sales. Your specialty is medical consumables used by hospitals on a daily basis. Your task is to enhance the description of a product based on the information provided.
      
      Product name: ${productName}
      Product description: ${productDescription}
      
      New Description:
    `;

    const data = {
      model: 'gpt-4',
      prompt: prompt,
      max_tokens: 150,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.confService.get('OPENAI_API_KEY')}`, // replace with your OpenAI API key
    };

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        data,
        { headers },
      );

      const enhancedDescription = response.data.choices[0].text.trim();
      return enhancedDescription;
    } catch (error) {
      console.error('Error enhancing description:', error);
    }
  }
}
