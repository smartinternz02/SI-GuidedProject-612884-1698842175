$(document).ready(function () {
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    function sendEmail() {
        var name = document.getElementById('name').value;
        var email = document.getElementById('inputEmail4').value;

        var subject = 'Contact Information';
        var body = 'Name: ' + name + '\nEmail: ' + email;

        var mailtoLink = 'mailto:priyankaraghunath03@outlook.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        
        window.location.href = mailtoLink;
    } 
    $(document).ready(function () {
        $('.submit').click(function () {
            sendEmail();
        });
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        $(this).hide();
        $('.loader').show();
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                $('.loader').hide();
                $('#result').fadeIn(600);
                if(data=="Glaucoma"){
                    $('#description').html(`
                    <h3>Result: Glaucoma</h3>
                    <p> <b>What is Glaucoma:</b> Glaucoma is a group of eye conditions that damage the optic nerve, often due to increased pressure in the eye. It is a leading cause of irreversible blindness if left untreated.</p>
                    <h4> Symptoms:</h4>
                    <ol>
                    <li><b>Gradual Loss of Peripheral Vision: </b> Often unnoticed in the early stages, peripheral vision gradually diminishes.</li>
                    <li><b>Tunnel Vision: </b> Advanced stages may lead to a tunnel-like narrowing of the visual field.</li>
                    <li><b>Blurred Vision:  </b>Vision becomes blurred or hazy.</li>
                    <li><b>Halos Around Lights: </b> Halos or glare, especially around lights.</li>
                    <li><b>Redness in the Eye: </b> In some cases, there may be redness and discomfort.</li>
                    </ol>
                    <h4>Prevention: </h4>
                    <p>While some risk factors are unavoidable, early detection and management can prevent vision loss:</p>
                    <ol>
                    <li><b>Regular Eye Exams: </b> Comprehensive eye exams are crucial, as glaucoma can be asymptomatic in the early stages.</li>
                    <li><b>Eye Pressure Monitoring:   </b> Regular monitoring of intraocular pressure, especially for individuals at higher risk.</li>
                    <li><b>Healthy Lifestyle:   </b>A healthy lifestyle, including regular exercise, can contribute to overall eye health.</li>
                    </ol>
                    <h4>Treatment</h4>
                    <ol>
                    <li><b>Medication:  </b>Eye drops or oral medications to reduce intraocular pressure.</li>
                    <li><b>Laser Therapy: </b>Laser trabeculoplasty to improve fluid drainage.</li>
                    <li><b>Surgery: </b>In advanced cases, surgical procedures may be necessary to improve fluid outflow and reduce pressure.</li>
                    </ol>
                    <p><b>Note to Users:</b> If your prediction indicates a risk of glaucoma, it is crucial to consult with an eye care professional promptly. Glaucoma is often asymptomatic in its early stages, making regular eye exams vital for early detection.</p>
                    `);
                }
                else if(data=="Diabetic Retinopathy"){
                    $('#description').html(`
                    <h3>Result: Diabetic Retinopathy</h3>
                    <p> <b>What is Diabetic Retinopathy: </b> Diabetic retinopathy is a diabetes-related eye condition that affects the blood vessels in the retina. High levels of blood sugar can damage the tiny blood vessels, leading to vision problems and, in severe cases, blindness.</p>
                    <h4> Symptoms:</h4>
                    <ol>
                    <li><b>Blurred Vision: </b> Vision becomes blurred, making it difficult to focus.</li>
                    <li><b>Floaters: </b> Dark spots or "floaters" may appear in the field of vision.</li>
                    <li><b>Impaired Color Vision:  </b>Difficulty perceiving colors accurately.</li>
                    <li><b>Dark or Empty Areas in Vision:  </b>Parts of the visual field may appear dark or empty.</li>
                    <li><b>Vision Fluctuations:   </b> Vision may vary due to changes in blood sugar levels.</li>
                    </ol>
                    <h4>Prevention: </h4>
                    <p>Effective management of diabetes is key to preventing diabetic retinopathy. Additionally:</p>
                    <ol>
                    <li><b>Regular Eye Exams: </b> Annual comprehensive eye exams can detect early signs.</li>
                    <li><b>Blood Sugar Control:  </b> Maintain stable blood sugar levels through proper diabetes management.</li>
                    <li><b>Blood Pressure Control:   </b>Manage blood pressure to reduce the risk of complications.</li>
                    <li><b>Healthy Lifestyle:   </b> Adopt a healthy lifestyle, including a balanced diet and regular exercise.</li>
                    </ol>
                    <h4>Treatment:</h4>
                    <ol>
                    <li><b>Laser Therapy:  </b>In early stages, laser treatment (photocoagulation) may be used to seal leaking blood vessels.</li>
                    <li><b>Intraocular Injections:  </b>Medications injected into the eye can slow the progression of the disease.</li>
                    <li><b>Vitrectomy: </b>In advanced cases, vitrectomy surgery may be performed to remove blood from the vitreous gel.</li>
                    <li><b>Anti-VEGF Injections: </b>Medications that inhibit the growth of abnormal blood vessels.</li>
                    </ol>
                    <p><b>Note to Users:</b> If your prediction indicates a risk of diabetic retinopathy, it is crucial to consult with a healthcare professional specializing in eye care for a comprehensive examination. Timely intervention and proper management can significantly impact the course of the disease.</p>
                    `);
                }
                else if(data=="Cataract"){
                    $('#description').html(`
                    <h3>Result: Cataract</h3>
                    <p> <b>What is Cataract:  </b> Cataract is a common eye condition characterized by the clouding of the eye's lens, leading to blurred vision and visual impairment. It often occurs with aging but can also result from other factors like injury, certain medications, or medical conditions.</p>
                    <h4> Symptoms:</h4>
                    <ol>
                    <li><b>Cloudy or Blurry Vision:  </b> Vision becomes hazy, making it difficult to see clearly.</li>
                    <li><b>Sensitivity to Light:  </b> : Increased sensitivity to bright lights, causing discomfort.</li>
                    <li><b>Difficulty Seeing at Night:   </b>Impaired vision in low-light conditions.</li>
                    <li><b>Changes in Color Perception:   </b>Colors may appear faded or yellowed.</li>
                    <li><b>Frequent Changes in Prescription:   </b> Need for more frequent changes in eyeglass prescription.</li>
                    </ol>
                    <h4>Prevention: </h4>
                    <p>While some risk factors are unavoidable, several measures can be taken to reduce the risk of developing cataracts:</p>
                    <ol>
                    <li><b>Regular Eye Exams: </b> Routine eye check-ups can detect early signs of cataracts.</li>
                    <li><b>UV Protection:   </b> Wearing sunglasses that block UV rays can help prevent cataracts.</li>
                    <li><b>Healthy Diet:    </b>A diet rich in antioxidants (vitamins C and E) may reduce cataract risk.</li>
                    <li><b>Quit Smoking:    </b> Smoking is linked to an increased risk of cataracts, so quitting can be beneficial.</li>
                    <li><b>Manage Diabetes: </b> Proper management of diabetes can help prevent cataracts.</li>
                    </ol>
                    <h4>Treatment:</h4>
                    <ol>
                    <li><b>Prescription Glasses:   </b>In the early stages, vision may be improved with new glasses or contact lenses.</li>
                    <li><b>Cataract Surgery:  </b>When vision loss significantly affects daily life, cataract surgery may be recommended.
                      <ul>
                        <li><b>Phacoemulsification: </b>Common method using ultrasound to break up and remove the cloudy lens.</li>
                        <li><b>Intraocular Lens (IOL): </b>An artificial lens replaces the natural lens.</li>
                        <li><b>Laser Surgery:</b>In some cases, lasers may assist in cataract surgery.</li>
                      </ul>
                    </li>
                    </ol>
                    <p><b>Note to Users:</b> If you have received a prediction indicating a risk of cataracts, it is crucial to consult with an eye care professional for a comprehensive examination. Early detection and proper management can significantly improve outcomes.</p>
                    `);
                }
                else if(data=="Normal"){
                    $('#description').html(`
                    <h3>Result: Normal Eyesight</h3>
                    <p> Congratulations! The prediction indicates that your eyesight is currently within the normal range. This means that your eyes are functioning well, and there are no indications of common eye conditions such as cataracts, diabetic retinopathy, or glaucoma.</p>
                    <ol>
                    <h4>What Does This Mean: </h4>
                    <p>Having normal eyesight implies that your vision is clear, and your eyes are healthy. However, it's essential to continue practicing good eye care habits, including regular eye check-ups, maintaining a healthy lifestyle, and protecting your eyes from environmental factors like excessive UV exposure.</p>
                    <h4>Recommendations: </h4>
                    <ol>
                      <li><b>Regular Eye Exams: </b> Even with normal eyesight, routine eye check-ups are valuable for early detection of any potential issues.</li>
                      <li><b>Eye Protection: </b>Consider using sunglasses that block UV rays when outdoors to protect your eyes.</li>
                      <li><b>Healthy Lifestyle: </b>Maintain a healthy lifestyle, including a balanced diet and regular exercise, to support overall eye health.</li>
                    </ol>
                    `);
                }
                console.log('Success!');
                $('#imageUpload').on('click', function updateContent(e){
                    $('#description').html(`
                    <h5>Embark on a seamless journey towards comprehensive eye health understanding!</h5><p> By effortlessly uploading an image, you empower our advanced model, which harnesses the strength of robust deep-learning techniques such as Inception V3, VGG19, and Xception V3.<br> <br>This cutting-edge technology enables the accurate prediction and categorization of various eye conditions, such as <b>Cataract, Diabetic Retinopathy, and Glaucoma.</b>

              Experience the precision of our predictive analytics as you receive tailored insights and detailed descriptions for each identified condition. <br><br>This user-friendly process is designed to not only provide you with precise predictions but also enhance your awareness of eye health. Your active involvement becomes the cornerstone of this journey, contributing to a more informed and proactive approach to caring for your eyes.</p>
              
                    `);
                });
            },
        });
    });

});
