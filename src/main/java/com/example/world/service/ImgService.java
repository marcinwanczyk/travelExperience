package com.example.world.service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;

@Service
public class ImgService {


    public String convertToBase64(MultipartFile file) throws IOException {
        byte[] fileBytes = file.getBytes();
        return Base64.getEncoder().encodeToString(fileBytes);
    }

    public String createDataUrl(MultipartFile file) throws IOException {
        String base64Image = convertToBase64(file);
        return "data:" + file.getContentType() + ";base64," + base64Image;
    }

}
