# Generated by Django 4.0.10 on 2023-06-29 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_user_date_of_birth_user_gender_user_ispaid_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='course',
            field=models.CharField(choices=[('BackEnd', 'Optimust'), ('UI/UX', 'DesignGuy'), ('FrontEnd', 'Sanni'), ('No Course', 'Starpenzu')], default='No Course', max_length=9, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='whatsapp_number',
            field=models.CharField(max_length=14, null=True),
        ),
    ]
