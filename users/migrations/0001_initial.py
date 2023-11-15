# Generated by Django 4.2 on 2023-09-27 04:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('bio', models.CharField(blank=True, default='', max_length=350, null=True)),
                ('gender', models.CharField(max_length=15)),
                ('profession', models.CharField(max_length=25)),
                ('email', models.CharField(max_length=50)),
                ('ban_status', models.IntegerField(default=0)),
                ('master_key', models.IntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]